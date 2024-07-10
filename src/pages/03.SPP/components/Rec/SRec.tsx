import { RefObject, useRef } from "react";
import "./Rec.css";
import { SppUtils } from "../../../../utils/spp.utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { Utils } from "../../../../utils/utils";

const SRec = () => {
  const dispatch = useDispatch();
  const filteredSRecData = useSelector(
    (state: RootState) => state.sppReducer.filteredSRecData
  ); // 선택된 년도의 REC 판매 데이터
  const inputDateRef = useRef<HTMLInputElement>(null); // 년-월-일 입력
  const inputSVolumeRef = useRef<HTMLInputElement>(null); // 판매량 입력
  const inputSPriceRef = useRef<HTMLInputElement>(null); // 판매가 입력

  //
  // 서버로 REC 판매 데이터 보내기
  const sendSRecData = async () => {
    const inputs: { ref: RefObject<HTMLInputElement>; name: string }[] = [
      { ref: inputDateRef, name: "날짜" },
      { ref: inputSVolumeRef, name: "판매량" },
      { ref: inputSPriceRef, name: "판매가" },
    ];

    // 빈값 체크
    const isNotNull = Utils.sendDataCheckIsNotNull(inputs);
    if (!isNotNull) return;

    // 각 상수에 값 할당
    const [date, sVolume, sPrice] = inputs.map((input) => {
      return input.ref.current!.value;
    });

    const sRecData = {
      // 형변형
      date: String(date),
      sVolume: Number(sVolume),
      sPrice: Number(sPrice),
    };

    const isAdded = await SppUtils.addSRecData(sRecData, dispatch);
    // 입력창 내용 리셋
    Utils.clearInputs(inputs, isAdded);
  };

  // 아이템 타이틀
  const itemsTitle = (
    <div className="spp-box-items-title">
      <div className="spp-sRec-deleteBtn"></div>
      <div className="spp-sRec-year">년</div>
      <div className="spp-sRec-month">월</div>
      <div className="spp-sRec-day">일</div>
      <div className="spp-sRec-sVolume">판매량</div>
      <div className="spp-sRec-sPrice">판매가</div>
      <div className="spp-sRec-calcul">판매량 x 판매가</div>
      <div className="spp-sRec-vat">vat</div>
      <div className="spp-sRec-total">총 판매 금액</div>
    </div>
  );

  console.log(filteredSRecData);

  // 아이템들
  const items = (
    <div className="spp-box-items-box">
      {filteredSRecData?.map((sRec, index) => {
        const createdAt = `작성일: ${new Date(
          sRec.createdAt
        ).toLocaleString()}`;
        const { sRecNumber, year, month, day, sVolume, sPrice } = sRec;
        const calcul = sVolume * sPrice;
        const vat = Math.floor(calcul / 10);
        const total = calcul + vat;
        return (
          <span className="spp-box-items" key={index} title={createdAt}>
            <button
              className="spp-sRec-deleteBtn"
              onClick={() =>
                SppUtils.deleteOneSRecData(
                  { sRecNumber, year, month, day },
                  dispatch
                )
              }
            >
              ㅡ
            </button>
            <div className="spp-sRec-year">{year}</div>
            <div className="spp-sRec-month">{month}</div>
            <div className="spp-sRec-day">{day}</div>
            <div className="spp-sRec-sVolume">{sVolume}</div>
            <div className="spp-sRec-sPrice">{sPrice}</div>
            <div className="spp-sRec-calcul">{calcul}</div>
            <div className="spp-sRec-vat">{vat}</div>
            <div className="spp-sRec-total">{total}</div>
          </span>
        );
      })}
    </div>
  );

  // 합계&평균
  const total = <div className="spp-sRec-total-box"></div>;

  // 입력
  const inputs = (
    <div className="spp-sRec-input-box">
      <input className="spp-sRec-input-date" type="date" ref={inputDateRef} />
      <input
        className="spp-sRec-input-sVolume"
        type="number"
        placeholder="판매량"
        ref={inputSVolumeRef}
      />
      <input
        className="spp-sRec-input-sPrice"
        type="number"
        placeholder="판매가"
        ref={inputSPriceRef}
      />
      <button className="spp-sRec-input-btn" onClick={sendSRecData}>
        추가하기
      </button>
    </div>
  );

  // 본문
  return (
    <div className="spp-sRec">
      <div className="spp-items-title">REC 판매</div>
      <div className="spp-sRec-box1">
        {itemsTitle}
        {items}
      </div>
      <div className="spp-sRec-box2">
        {total}
        {inputs}
      </div>
    </div>
  );
};

export default SRec;
