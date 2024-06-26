import "./Solar.css";
import { RefObject, useEffect, useRef, useState } from "react";
import { BackApiUtils } from "../../../utils/backApi.utils";
import {
  IDeleteOneSolarData,
  ISolarDataFromBack,
} from "../../../utils/interfaces/api.interface";
import { Utils } from "../../../utils/utils";

const Solar = ({
  solarData,
}: {
  solarData: ISolarDataFromBack[] | undefined;
}) => {
  const inputYearAndMonthRef = useRef<HTMLInputElement>(null); // 년-월 입력
  const inputGenerationRef = useRef<HTMLInputElement>(null); // 발전량 입력
  const inputSMPRef = useRef<HTMLInputElement>(null); // SMP 입력
  const inputSupplyPriceRef = useRef<HTMLInputElement>(null); // 공급가액 입력
  const [seletedYear, setSeletedYear] = useState<string>(); // selet에서 선택된 년
  const [solarData2, setSolarData2] = useState<
    ISolarDataFromBack[] | undefined
  >();
  const [filteredSolarData, setFilteredSolarData] = useState<
    ISolarDataFromBack[] | undefined
  >();

  // 초기값으로 Spp에서 넘겨준 solar 데이터 넣기, 초기 선택 년 넣어주기
  useEffect(() => {
    setSolarData2(solarData);
    const years = Utils.selectYears(solarData);
    setSeletedYear(years[0]);
  }, [solarData]);

  // 보여줄 데이터 필터링
  useEffect(() => {
    const filteredSolarData = Utils.filteringData(
      Number(seletedYear),
      solarData2
    );
    setFilteredSolarData(filteredSolarData);
  }, [solarData2, seletedYear]);

  // 서버로 태양광 데이터 보내기
  const sendData = async () => {
    const inputs: { ref: RefObject<HTMLInputElement>; name: string }[] = [
      { ref: inputYearAndMonthRef, name: "년-월" },
      { ref: inputGenerationRef, name: "발전량" },
      { ref: inputSMPRef, name: "SMP" },
      { ref: inputSupplyPriceRef, name: "공급가액" },
    ];

    let isOk = true; // 빈칸 없음

    // 빈값 체크하고 알림
    for (let input of inputs) {
      if (!input.ref.current || !input.ref.current.value) {
        alert(`${input.name}을(를) 입력해주세요.`);
        isOk = false;
        break;
      }
    }

    // 빈칸 없으면
    if (isOk) {
      // 상수 할당
      const [yearAndMonth, generation, smp, supplyPrice] = inputs.map(
        (input) => {
          return input.ref.current!.value;
        }
      );

      const solarData = {
        // 형 변형
        yearAndMonth: String(yearAndMonth),
        generation: Number(generation),
        smp: Number(smp),
        supplyPrice: Number(supplyPrice),
      };

      const isAdded = await BackApiUtils.addSolarData(solarData, setSolarData2);
      // 입력창 내용 리셋
      if (isAdded) {
        inputs.forEach((input) => {
          if (input.ref && input.ref.current) input.ref.current.value = "";
        });
      }
    }
  };

  // 태양광 데이터 한 개 삭제하기
  const deleteOneData = ({ year, month }: IDeleteOneSolarData) => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm(
      `${year}년 ${month}월 태양광 데이터를 삭제 하시겠습니까?`
    );
    const deleteOneSolarData = { year, month };
    if (result) BackApiUtils.deleteSolarData(deleteOneSolarData, setSolarData2);
  };

  // 타이틀
  const title = (
    <>
      <div>태양광</div>
      {solarData2 ? (
        <select
          className="spp-solar-title-selet"
          onChange={(e) => setSeletedYear(e.target.value)}
        >
          {Utils.selectYears(solarData2).map((year, index) => (
            <option className="" key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      ) : (
        <div></div>
      )}{" "}
    </>
  );

  // 아이템 타이틀
  const itemsTitle = (
    <div className="spp-solar-box-items-title">
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
    <div className="spp-solar-box-items-box">
      {filteredSolarData?.map((solar, index) => {
        const createdAt = `작성일: ${new Date(solar.createdAt).toLocaleString(
          "ko-KR"
        )}`;
        const year = solar.year;
        const month = solar.month;
        const calcul = Math.floor(solar.generation * solar.smp);
        const comparison = calcul === solar.supplyPrice;
        const vat = Math.floor(solar.supplyPrice / 10);
        const total = solar.supplyPrice + vat;
        return (
          <span className="spp-solar-box-items" key={index} title={createdAt}>
            <button
              className="spp-solar-deleteBtn"
              onClick={() => deleteOneData({ year, month })}
            >
              -
            </button>
            <div className="spp-solar-year">{solar.year}</div>
            <div className="spp-solar-month">{solar.month}</div>
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

  const totals = Utils.solarTotal(filteredSolarData);
  console.log(totals);

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
      {totals.map((data) => (
        <div className="spp-solar-total-item-box">
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
      <button className="spp-solar-input-btn" onClick={sendData}>
        추가하기
      </button>
    </div>
  );

  // 본문
  return (
    <div className="spp-solar">
      <div className="spp-solar-title">{title}</div>
      <div className="spp-solar-box">
        {itemsTitle}
        {items}
        {total}
        {inputs}
      </div>
    </div>
  );
};

export default Solar;
