import "./Solar.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { SppUtils } from "../../../utils/spp.utils";
import InputSolar from "./InputSolar";
import { Utils } from "../../../utils/utils";

const Solar = () => {
  const dispatch = useDispatch();
  const filteredSolar = useSelector(
    (state: RootState) => state.sppReducer.filteredSolar
  ); // 선택된 년도의 태양광 데이터

  // 아이템 타이틀
  const itemsTitle = (
    <div className="spp-box-box1-items-title">
      <div className="spp-solar-deleteBtn"></div>
      <div className="spp-solar-year">발전 년</div>
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
    <div className="spp-box-box1-items-box">
      {filteredSolar?.map((solar, index) => {
        const {
          solarNumber,
          year,
          month,
          generation,
          smp,
          supplyPrice,
          createdAt,
        } = solar;
        const calcul = Math.floor(generation * solar.smp);
        const comparison = calcul === supplyPrice;
        const vat = Math.floor(supplyPrice / 10);
        const total = supplyPrice + vat;
        return (
          <span
            className="spp-box-box1-items"
            key={index}
            title={Utils.makeCreatedAt(createdAt)}
          >
            <button
              className="spp-solar-deleteBtn"
              onClick={() => {
                SppUtils.deleteOneSolar({ solarNumber, year, month }, dispatch);
              }}
            >
              ㅡ
            </button>
            <div className="spp-solar-year">{year}</div>
            <div className="spp-solar-month">{month}</div>
            <div className="spp-solar-generation">
              {generation.toLocaleString()}
            </div>
            <div className="spp-solar-smp">{smp.toLocaleString()}</div>
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
              {supplyPrice.toLocaleString()}
            </div>
            <div className="spp-solar-vat">{vat.toLocaleString()}</div>
            <div className="spp-solar-total">{total.toLocaleString()}</div>
          </span>
        );
      })}
    </div>
  );

  // 합계&평균
  const totals = SppUtils.solarTotal(filteredSolar);
  const total = (
    <div className="spp-box-box2-total-box">
      <div className="spp-box-box2-total-title-box">
        <span className="spp-solar-total-text"></span>
        <span className="spp-solar-total-generation">발전량</span>
        <span className="spp-solar-total-smp">SMP</span>
        <span className="spp-solar-total-calcul">발전량 x SMP</span>
        <span className="spp-solar-total-supplyPrice">공급가액</span>
        <span className="spp-solar-total-vat">vat</span>
        <span className="spp-solar-total-total">총액</span>
      </div>
      {totals.map((data, index) => (
        <div className="spp-box-box2-total-item-box" key={index}>
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

  // 본문
  return (
    <div className="spp-solar">
      <div className="spp-items-title">
        태양광
        <span className="spp-items-title-count">
          {filteredSolar ? `${filteredSolar.length}건` : ""}
        </span>
      </div>
      <div className="spp-box-box1">
        {itemsTitle}
        {items}
      </div>
      <div className="spp-box-box2">
        {total}
        <InputSolar />
      </div>
    </div>
  );
};

export default Solar;
