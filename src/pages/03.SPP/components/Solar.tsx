import React, { RefObject, useRef } from "react";
import { BackApiUtils } from "../../../utils/backApi.utils";

const Solar = () => {
  const inputYearAndMonthRef = useRef<HTMLInputElement>(null);
  const inputGenerationRef = useRef<HTMLInputElement>(null);
  const inputSMPRef = useRef<HTMLInputElement>(null);
  const inputSupplyPriceRef = useRef<HTMLInputElement>(null);

  // 서버로 태양광 데이터 보내기
  const sendData = () => {
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

      BackApiUtils.addSolarData(solarData);
    }
  };

  //
  const title = (
    <div className="spp-solar-box-items-title">
      <div className="spp-solar-year">년</div>
      <div className="spp-solar-month">월</div>
      <div className="spp-solar-generation">발전량</div>
      <div className="spp-solar-smp">SMP</div>
      <div className="spp-solar-calcul">계</div>
      <div className="spp-solar-supplyPrice">공급가액</div>
      <div className="spp-solar-vat">vat</div>
      <div className="spp-solar-total">총액</div>
    </div>
  );

  //
  const items = (
    <div className="spp-solar-box-items-box">
      <div className="spp-solar-box-items">
        <div className="spp-solar-year">2024</div>
        <div className="spp-solar-month">05</div>
        <div className="spp-solar-generation">59,122</div>
        <div className="spp-solar-smp">126,36</div>
        <div className="spp-solar-calcul">17,470,655.92</div>
        <div className="spp-solar-supplyPrice">17,470,655</div>
        <div className="spp-solar-vat">1747,065</div>
        <div className="spp-solar-total">118,217,720</div>
      </div>
    </div>
  );

  //
  const total = (
    <div className="spp-solar-total-box">
      <div>total</div>
    </div>
  );

  //
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
      <div className="spp-solar-title">태양광</div>
      <div className="spp-solar-box">
        {title}
        {items}
        {total}
        {inputs}
        {/* <div className="spp-solar-box-items">
          <div>2024</div>
          <div>05</div>
          <div>59,122</div>
          <div>126,36</div>
          <div>계(계산된값)</div>
          <div>7470655</div>
          <div>vat(계산된값)</div>
          <div>총액(계산된값)</div>
        </div> */}
      </div>
    </div>
  );
};

export default Solar;
