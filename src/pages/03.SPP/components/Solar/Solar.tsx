import "./Solar.css";
import { RefObject, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { SppUtils } from "../../../../utils/spp.utils";
import { Utils } from "../../../../utils/utils";

const Solar = () => {
  const dispatch = useDispatch();
  const filteredSolarData = useSelector(
    (state: RootState) => state.sppReducer.filteredSolarData
  ); // 선택된 년도의 태양광 데이터
  const inputYearAndMonthRef = useRef<HTMLInputElement>(null); // 년-월 입력
  const inputGenerationRef = useRef<HTMLInputElement>(null); // 발전량 입력
  const inputSMPRef = useRef<HTMLInputElement>(null); // SMP 입력
  const inputSupplyPriceRef = useRef<HTMLInputElement>(null); // 공급가액 입력

  //
  // 서버로 태양광 데이터 보내기
  const sendSolarData = async () => {
    const inputs: { ref: RefObject<HTMLInputElement>; name: string }[] = [
      { ref: inputYearAndMonthRef, name: "년-월" },
      { ref: inputGenerationRef, name: "발전량" },
      { ref: inputSMPRef, name: "SMP" },
      { ref: inputSupplyPriceRef, name: "공급가액" },
    ];

    let isNotNull = true; // 빈값 없음

    // 빈값 체크하고 알림
    Utils.sendDataCheckIsNotNull(inputs, isNotNull);

    if (isNotNull) {
      // 각 상수에 값 할당
      const [yearAndMonth, generation, smp, supplyPrice] = inputs.map(
        (input) => {
          return input.ref.current!.value;
        }
      );

      const solarInputData = {
        // 형 변형
        yearAndMonth: String(yearAndMonth),
        generation: Number(generation),
        smp: Number(smp),
        supplyPrice: Number(supplyPrice),
      };

      const isAdded = await SppUtils.addSolarData(solarInputData, dispatch);
      // 입력창 내용 리셋
      Utils.clearInputs(inputs, isAdded);
    }
  };

  // 아이템 타이틀
  const itemsTitle = (
    <div className="spp-box-items-title">
      <div className="spp-solar-deleteBtn"></div>
      <div className="spp-solar-year">년</div>
      <div className="spp-solar-month">월</div>
      <div className="spp-solar-generation">발전량</div>
      <div className="spp-solar-smp">SMP</div>
      <div className="spp-solar-calcul">발전량 x SMP</div>
      <div className="spp-solar-supplyPrice">공급가액</div>
      <div className="spp-solar-vat">vat</div>
      <div className="spp-solar-total">총액</div>
    </div>
  );

  // 아이템들
  const items = (
    <div className="spp-box-items-box">
      {filteredSolarData?.map((solar, index) => {
        const createdAt = `작성일: ${new Date(solar.createdAt).toLocaleString(
          "ko-KR"
        )}`;
        const { solarNumber, year, month, generation, supplyPrice } = solar;
        const calcul = Math.floor(generation * solar.smp);
        const comparison = calcul === supplyPrice;
        const vat = Math.floor(supplyPrice / 10);
        const total = supplyPrice + vat;
        return (
          <span className="spp-box-items" key={index} title={createdAt}>
            <button
              className="spp-solar-deleteBtn"
              onClick={() => {
                SppUtils.deleteOneSolarData(
                  { solarNumber, year, month },
                  dispatch
                );
              }}
            >
              ㅡ
            </button>
            <div className="spp-solar-year">{year}</div>
            <div className="spp-solar-month">{month}</div>
            <div className="spp-solar-generation">
              {solar.generation.toLocaleString()}
            </div>
            <div className="spp-solar-smp">{solar.smp.toLocaleString()}</div>
            <div
              className="spp-solar-calcul"
              style={{ backgroundColor: comparison ? "" : "red" }}
            >
              {calcul.toLocaleString()}
            </div>
            <div
              className="spp-solar-supplyPrice"
              style={{ backgroundColor: comparison ? "" : "red" }}
            >
              {solar.supplyPrice.toLocaleString()}
            </div>
            <div className="spp-solar-vat">{vat.toLocaleString()}</div>
            <div className="spp-solar-total">{total.toLocaleString()}</div>
          </span>
        );
      })}
    </div>
  );

  const totals = SppUtils.solarTotal(filteredSolarData);

  // 합계&평균
  const total = (
    <div className="spp-solar-total-box">
      <div className="spp-solar-total-title-box">
        <span className="spp-solar-total-text"></span>
        <span className="spp-solar-total-generation">발전량</span>
        <span className="spp-solar-total-smp">SMP</span>
        <span className="spp-solar-total-calcul">발전량 x SMP</span>
        <span className="spp-solar-total-supplyPrice">공급가액</span>
        <span className="spp-solar-total-vat">vat</span>
        <span className="spp-solar-total-total">총액</span>
      </div>
      {totals.map((data, index) => (
        <div className="spp-solar-total-item-box" key={index}>
          <span className="spp-solar-total-text">{data.name}</span>
          <span
            className="spp-solar-total-generation"
            title={data.generation.toLocaleString()}
          >
            {data.generation.toLocaleString()}
          </span>
          <span
            className="spp-solar-total-smp"
            title={data.smp.toLocaleString()}
          >
            {data.smp.toLocaleString()}
          </span>
          <span
            className="spp-solar-total-calcul"
            title={data.calcul.toLocaleString()}
          >
            {data.calcul.toLocaleString()}
          </span>
          <span
            className="spp-solar-total-supplyPrice"
            title={data.supplyPrice.toLocaleString()}
          >
            {data.supplyPrice.toLocaleString()}
          </span>
          <span
            className="spp-solar-total-vat"
            title={data.vat.toLocaleString()}
          >
            {data.vat.toLocaleString()}
          </span>
          <span
            className="spp-solar-total-total"
            title={data.total.toLocaleString()}
          >
            {data.total.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );

  // 입력
  const inputs = (
    <div className="spp-solar-input-box">
      <input
        className="spp-solar-input-yearAndMonth"
        type="month"
        ref={inputYearAndMonthRef}
      />
      <input
        className="spp-solar-input-generation"
        type="number"
        placeholder="발전량"
        ref={inputGenerationRef}
      />
      <input
        className="spp-solar-input-smp"
        type="number"
        placeholder="SMP"
        ref={inputSMPRef}
      />
      <input
        className="spp-solar-input-supplyPrice"
        type="number"
        placeholder="공급가액"
        ref={inputSupplyPriceRef}
      />
      <button className="spp-solar-input-btn" onClick={sendSolarData}>
        추가하기
      </button>
    </div>
  );

  // 본문
  return (
    <div className="spp-solar">
      <div className="spp-items-title">태양광</div>
      <div className="spp-solar-box1">
        {itemsTitle}
        {items}
      </div>
      <div className="spp-solar-box2">
        {total}
        {inputs}
      </div>
    </div>
  );
};

export default Solar;
