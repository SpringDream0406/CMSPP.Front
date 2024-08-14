import { RefObject, useRef } from "react";
import { SppUtils } from "../../../utils/spp.utils";
import { useDispatch } from "react-redux";

const InputFixedExpense = () => {
  const dispatch = useDispatch();
  const inputFeNameRef = useRef<HTMLInputElement>(null);
  const inputFePriceRef = useRef<HTMLInputElement>(null);

  //
  // 서버로 고정 지출 데이터 보내기
  const sendFixedExpense = async () => {
    const inputs: { ref: RefObject<HTMLInputElement>; name: string }[] = [
      { ref: inputFeNameRef, name: "지출명" },
      { ref: inputFePriceRef, name: "지출액" },
    ];

    await SppUtils.sendData(
      inputs,
      ([feName, fePrice]) => ({
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
  );
};

export default InputFixedExpense;
