import { RefObject, useRef } from "react";
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

    await SppUtils.sendData(
      inputs,
      ([date, generation, smp, supplyPrice]) => ({
        date: String(date),
        generation: Number(generation),
        smp: Number(smp),
        supplyPrice: Number(supplyPrice),
      }),
      SppUtils.addSolar,
      dispatch
    );
  };

  // 본문
  return (
    <div className="spp-box-box2-input-box">
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
