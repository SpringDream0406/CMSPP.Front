import { RefObject, useRef } from "react";
import { SppUtils } from "../../../utils/spp.utils";
import { useDispatch } from "react-redux";

const InputFixedExpense = () => {
  const dispatch = useDispatch();
  const inputStartDateRef = useRef<HTMLInputElement>(null);
  const inputEndDateRef = useRef<HTMLInputElement>(null);
  const inputFeNameRef = useRef<HTMLInputElement>(null);
  const inputFePriceRef = useRef<HTMLInputElement>(null);

  //
  // 서버로 고정 지출 데이터 보내기
  const sendFixedExpense = async () => {
    const inputs: { ref: RefObject<HTMLInputElement>; name: string }[] = [
      { ref: inputStartDateRef, name: "시작 년-월" },
      { ref: inputEndDateRef, name: "종료 년-월" },
      { ref: inputFeNameRef, name: "지출명" },
      { ref: inputFePriceRef, name: "지출액" },
    ];

    await SppUtils.sendData(
      inputs,
      ([startDate, endDate, feName, fePrice]) => ({
        startDate: String(startDate),
        endDate: String(endDate),
        feName: String(feName),
        fePrice: Number(fePrice),
      }),
      SppUtils.addFixedExpense,
      dispatch
    );
  };

  // 본문
  return (
    <div className="spp-box-box2-input-box">
      <div className="spp-box-box2-input-box-titles">
        <div className="spp-fe-input-startDate">- 시작 월</div>
        <div className="spp-fe-input-endDate">- 종료 월</div>
        <div className="spp-fe-input-feName">- 지출명</div>
        <div className="spp-fe-input-fePrice">- 지출액</div>
      </div>
      <div className="spp-box-box2-input-box-inputs">
        <input
          className="spp-fe-input-startDate"
          type="month"
          ref={inputStartDateRef}
        />
        <input
          className="spp-fe-input-endDate"
          type="month"
          ref={inputEndDateRef}
        />
        <input
          className="spp-fe-input-feName"
          type="text"
          placeholder="지출명"
          ref={inputFeNameRef}
        />
        <input
          className="spp-fe-input-fePrice"
          type="number"
          placeholder="지출액"
          ref={inputFePriceRef}
        />
        <button className="spp-fe-input-btn" onClick={sendFixedExpense}>
          추가하기
        </button>
      </div>
    </div>
  );
};

export default InputFixedExpense;
