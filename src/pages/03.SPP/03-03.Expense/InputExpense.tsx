import { RefObject, useRef } from "react";
import { SppUtils } from "../../../utils/spp.utils";
import { useDispatch } from "react-redux";

const InputExpense = () => {
  const dispatch = useDispatch();
  const inputDateRef = useRef<HTMLInputElement>(null);
  const inputENameRef = useRef<HTMLInputElement>(null);
  const inputEPriceRef = useRef<HTMLInputElement>(null);

  //
  // 서버로 지출 데이터 보내기
  const sendExpense = async () => {
    const inputs: { ref: RefObject<HTMLInputElement>; name: string }[] = [
      { ref: inputDateRef, name: "날짜" },
      { ref: inputENameRef, name: "지출명" },
      { ref: inputEPriceRef, name: "지출액" },
    ];

    await SppUtils.sendData(
      inputs,
      ([date, eName, ePrice]) => ({
        date: String(date),
        eName: String(eName),
        ePrice: Number(ePrice),
      }),
      SppUtils.addExpense,
      dispatch
    );
  };

  // 본문
  return (
    <div className="spp-box-box2-input-box">
      <div className="spp-box-box2-input-box-titles">
        <div className="spp-ex-input-date">- 지출 일</div>
        <div className="spp-ex-input-eName">- 지출명</div>
        <div className="spp-ex-input-ePrice">- 지출액</div>
      </div>
      <div className="spp-box-box2-input-box-inputs">
        <input className="spp-ex-input-date" type="date" ref={inputDateRef} />
        <input
          className="spp-ex-input-eName"
          type="text"
          placeholder="지출명"
          ref={inputENameRef}
        />
        <input
          className="spp-ex-input-ePrice"
          type="number"
          placeholder="지출액"
          ref={inputEPriceRef}
        />
        <button className="spp-ex-input-btn" onClick={sendExpense}>
          추가하기
        </button>
      </div>
    </div>
  );
};

export default InputExpense;
