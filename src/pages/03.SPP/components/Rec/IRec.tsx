import "./Rec.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useEffect, useState } from "react";
import { SppUtils } from "../../../../utils/spp.utils";
import { IIRecData } from "../../../../interfaces/utils.interface";

const IRec = () => {
  const filteredSolarData = useSelector(
    (state: RootState) => state.sppReducer.filteredSolarData
  );
  const [iRecData, setIRecData] = useState<IIRecData[]>([]);

  // iRec 데이터 만들기
  useEffect(() => {
    setIRecData(SppUtils.createIRecData(filteredSolarData));
  }, [filteredSolarData]);

  // 아이템 타이틀
  const itemsTitle = (
    <div className="spp-box-items-title">
      <div className="spp-iRec-issuance">발급량</div>
      <div className="spp-iRec-fee">발급수수료</div>
      <div className="spp-iRec-remain">차기이월분</div>
    </div>
  );

  // 아이템들
  const items = (
    <div className="spp-box-items-box">
      {iRecData?.map((iRec, index) => {
        const craetedAt = `작성일: ${new Date(iRec.createdAt).toLocaleString(
          "ko-KR"
        )}`;
        return (
          <span className="spp-box-items" key={index} title={craetedAt}>
            <div className="spp-iRec-issuance">
              {iRec.issuance.toLocaleString()}
            </div>
            <div className="spp-iRec-fee">{iRec.fee.toLocaleString()}</div>
            <div className="spp-iRec-remain">
              {parseFloat(iRec.remain.toFixed(3))}
            </div>
          </span>
        );
      })}
    </div>
  );

  const totals = SppUtils.iRecTotal(iRecData);
  console.log(totals);

  // 합계&평균
  const total = (
    <div className="spp-iRec-total-box">
      <div className="spp-iRec-total-title-box">
        <span className="spp-iRec-total-text"></span>
        <span className="spp-iRec-total-issuance">발급량</span>
        <span className="spp-iRec-total-fee">발급수수료</span>
        <span className="spp-iRec-total-remain">차기이월분</span>
      </div>
      {totals.map((data, index) => (
        <div className="spp-iRec-total-item-box" key={index}>
          <span className="spp-iRec-total-text">{data.name}</span>
          <span
            className="spp-iRec-total-issuance"
            title={data.issuance.toLocaleString()}
          >
            {data.issuance.toLocaleString()}
          </span>
          <span
            className="spp-iRec-total-fee"
            title={data.fee.toLocaleString()}
          >
            {data.fee.toLocaleString()}
          </span>
          <span
            className="spp-iRec-total-remain"
            title={data.remain.toLocaleString()}
          >
            {data.remain.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );

  // 본문
  return (
    <div className="spp-iRec">
      <div className="spp-items-title">REC 발급</div>
      <div className="spp-iRec-box1">
        {itemsTitle}
        {items}
      </div>
      <div className="spp-iRec-box2">{total}</div>
    </div>
  );
};

export default IRec;
