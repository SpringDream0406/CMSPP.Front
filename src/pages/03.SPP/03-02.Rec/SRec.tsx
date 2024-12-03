import "./Rec.css";
import { SppUtils } from "../../../utils/spp.utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import InputSRec from "./InputSRec";
import { Utils } from "../../../utils/utils";

const SRec = () => {
  const dispatch = useDispatch();
  const filteredSRec = useSelector(
    (state: RootState) => state.sppReducer.filteredSRec
  ); // 선택된 년도의 REC 판매 데이터
  const kWh = useSelector((state: RootState) => state.sppReducer.myInfo.kWh!);

  //
  // 아이템 타이틀
  const itemsTitle = (
    <div className="spp-box-box1-items-title">
      <div className="spp-sRec-deleteBtn"></div>
      <div className="spp-sRec-date">날짜</div>
      <div className="spp-sRec-sVolume">판매량</div>
      <div className="spp-sRec-sPrice">판매가</div>
      <div className="spp-sRec-calcul">판매량 x 판매가</div>
      <div className="spp-sRec-vat">vat</div>
      <div className="spp-sRec-fee">수수료</div>
      <div className="spp-sRec-total">총 판매 금액</div>
    </div>
  );

  // 아이템들
  const items = (
    <div className="spp-box-box1-items-box">
      {filteredSRec?.map((sRec, index) => {
        const { id, date, sVolume, sPrice, createdAt } = sRec;
        const calcul = sVolume * sPrice;
        const vat = Math.floor(calcul / 10);
        const fee = sVolume * (kWh < 100 ? 0 : 55);
        const total = calcul + vat - fee;
        return (
          <span
            className="spp-box-box1-items"
            key={index}
            title={Utils.makeCreatedAt(createdAt)}
            style={{
              backgroundColor: Utils.quarterBackGroundColor(date),
            }}
          >
            <button
              className="spp-sRec-deleteBtn"
              onClick={() => SppUtils.deleteOneSRec({ id, date }, dispatch)}
            >
              ㅡ
            </button>
            <div className="spp-sRec-date">{date}</div>
            <div className="spp-sRec-sVolume">{sVolume.toLocaleString()}</div>
            <div className="spp-sRec-sPrice">{sPrice.toLocaleString()}</div>
            <div className="spp-sRec-calcul">{calcul.toLocaleString()}</div>
            <div className="spp-sRec-vat">{vat.toLocaleString()}</div>
            <div className="spp-sRec-fee">{fee.toLocaleString()}</div>
            <div className="spp-sRec-total">{total.toLocaleString()}</div>
          </span>
        );
      })}
    </div>
  );

  // 합계&평균
  const totals = SppUtils.sRecTotal(filteredSRec, kWh);
  const total = (
    <div className="spp-box-box2-total-box">
      <div className="spp-box-box2-total-title-box">
        <span className="spp-sRec-total-text"></span>
        <span className="spp-sRec-total-sVolume">판매량</span>
        <span className="spp-sRec-total-sPrice">판매가</span>
        <span className="spp-sRec-total-calcul">판매량 x 판매가</span>
        <span className="spp-sRec-total-vat">vat</span>
        <span className="spp-sRec-total-fee">수수료</span>
        <span className="spp-sRec-total-total">총 판매 금액</span>
      </div>
      {totals.map((data, index) => (
        <div className="spp-box-box2-total-item-box" key={index}>
          <span className="spp-sRec-total-text">{data.name}</span>
          <span
            className="spp-sRec-total-sVolume"
            title={data.sVolume.toLocaleString()}
          >
            {data.sVolume.toLocaleString()}
          </span>
          <span
            className="spp-sRec-total-sPrice"
            title={data.sPrice.toLocaleString()}
          >
            {data.sPrice.toLocaleString()}
          </span>
          <span
            className="spp-sRec-total-calcul"
            title={data.calcul.toLocaleString()}
          >
            {data.calcul.toLocaleString()}
          </span>
          <span
            className="spp-sRec-total-vat"
            title={data.vat.toLocaleString()}
          >
            {data.vat.toLocaleString()}
          </span>
          <span
            className="spp-sRec-total-fee"
            title={data.fee.toLocaleString()}
          >
            {data.fee.toLocaleString()}
          </span>
          <span
            className="spp-sRec-total-total"
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
    <div className="spp-sRec">
      <div className="spp-items-title">
        REC 판매
        <span className="spp-items-title-count">
          {filteredSRec ? `${filteredSRec.length}건` : ""}
        </span>
      </div>
      <div className="spp-box-box1">
        {itemsTitle}
        {items}
      </div>
      <div className="spp-box-box2">
        {total}
        <InputSRec />
      </div>
    </div>
  );
};

export default SRec;
