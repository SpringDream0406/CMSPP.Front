import { RefObject, useRef } from "react";
import { Utils } from "../../../utils/utils";
import { SppUtils } from "../../../utils/spp.utils";
import { useDispatch } from "react-redux";

const InputSolar = () => {
  const dispatch = useDispatch();
  const inputdateRef = useRef<HTMLInputElement>(null); // 년-월 입력
  const inputGenerationRef = useRef<HTMLInputElement>(null); // 발전량 입력
  const inputSMPRef = useRef<HTMLInputElement>(null); // SMP 입력
  const inputSupplyPriceRef = useRef<HTMLInputElement>(null); // 공급가액 입력

  //
  // 태양광 데이터 서버로 보내기
  const sendSolar = async () => {
    const inputs: { ref: RefObject<HTMLInputElement>; name: string }[] = [
      { ref: inputdateRef, name: "년-월" },
      { ref: inputGenerationRef, name: "발전량" },
      { ref: inputSMPRef, name: "SMP" },
      { ref: inputSupplyPriceRef, name: "공급가액" },
    ];

    // 빈값 체크
    const isNotNull = Utils.sendDataCheckIsNotNull(inputs);
    if (!isNotNull) return;

    // 각 상수에 값 할당
    const [date, generation, smp, supplyPrice] = inputs.map((input) => {
      return input.ref.current!.value;
    });

    const solarInput = {
      date: String(date), // 형 변형
      generation: Number(generation),
      smp: Number(smp),
      supplyPrice: Number(supplyPrice),
    };

    const isAdded = await SppUtils.addSolar(solarInput, dispatch);
    if (isAdded) Utils.clearInputs(inputs); // 입력창 내용 리셋
  };

  // 본문
  return (
    <div className="spp-box1-box1-input-box">
      <input className="spp-solar-input-date" type="month" ref={inputdateRef} />
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
      <button className="spp-solar-input-btn" onClick={sendSolar}>
        추가하기
      </button>
    </div>
  );
};
export default InputSolar;
