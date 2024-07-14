import { RefObject, useRef } from "react";
import { Utils } from "../../../utils/utils";
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

    // 빈값 체크
    const isNotNull = Utils.sendDataCheckIsNotNull(inputs);
    if (!isNotNull) return;

    // 각 상수에 값 할당
    const [date, eName, ePrice] = inputs.map((input) => {
      return input.ref.current!.value;
    });

    const expenseInput = {
      date: String(date), // 형변형
      eName: String(eName),
      ePrice: Number(ePrice),
    };

    const isAdded = await SppUtils.addExpense(expenseInput, dispatch);
  };
  // 본문
  return (
    <div className="spp-box2-box2-input-box">
      <input
        className="spp-expense-input-date"
        type="date"
        ref={inputDateRef}
      />
      <input
        className="spp-expense-input-eName"
        type="text"
        placeholder="지출명"
        ref={inputENameRef}
      />
      <input
        className="spp-expense-input-ePrice"
        type="number"
        placeholder="지출액"
        ref={inputEPriceRef}
      />
      <button className="spp-expense-input-btn" onClick={sendExpense}>
        추가하기
      </button>
    </div>
  );
};

export default InputExpense;
