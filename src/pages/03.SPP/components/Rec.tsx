import { useState } from "react";
import { IRecDataFromBack } from "../../../interfaces/api.interface";
import "./Rec.css";
import SppTitle from "./compoenets/SppTitle";

const Rec = ({ recData }: { recData: IRecDataFromBack[] | undefined }) => {
  const [seletedYear, setSeletedYear] = useState<string>(); // selet에서 선택된 년

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

  // 입력
  const inputs = (
    <div className="spp-solar-input-box">
      <input className="spp-solar-input-yearAndMonth" type="month" />
      <input
        className="spp-solar-input-generation"
        type="number"
        placeholder="발전량"
      />
      <input className="spp-solar-input-smp" type="number" placeholder="SMP" />
      <input
        className="spp-solar-input-supplyPrice"
        type="number"
        placeholder="공급가액"
      />
      <button className="spp-solar-input-btn">추가하기</button>
    </div>
  );

  return (
    <div className="spp-rec">
      <div className="spp-rec-title">
        <SppTitle name="REC" data={recData} setSeletedYear={setSeletedYear} />
      </div>
      <div className="spp-rec-box">
        {itemsTitle}
        {inputs}
      </div>
    </div>
  );
};

export default Rec;
