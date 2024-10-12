import { useSelector } from "react-redux";
import "./Tax.css";
import { RootState } from "../../../redux/store";
import { SppUtils } from "../../../utils/spp.utils";
const Tax = () => {
  // 분기별 계산에 필요한 데이터들
  const filteredSolar = useSelector(
    (state: RootState) => state.sppReducer.filteredSolar
  );
  const filteredSRec = useSelector(
    (state: RootState) => state.sppReducer.filteredSRec
  );
  const filteredExpense = useSelector(
    (state: RootState) => state.sppReducer.filteredExpense
  );
  const fixedExpense = useSelector(
    (state: RootState) => state.sppReducer.fixedExpense
  );

  // 분기별 계산된 데이터
  const taxCalCuls = SppUtils.taxCalCul(
    filteredSolar,
    filteredSRec,
    filteredExpense,
    fixedExpense
  );

  // 데이터 한글명
  const labels = {
    sales: "매출",
    purchases: "매입",
    vat: "부가가치세",
  };

  // 분기별 계산된 내용
  const taxCalCul = Object.entries(taxCalCuls).map(([key, value], index) => (
    <div className="spp-tax-box1-items" key={index}>
      <div className="spp-tax-box1-text">
        {labels[key as keyof typeof labels]}
      </div>
      <div className="spp-tax-box1-quarter">{value.q1.toLocaleString()}</div>
      <div className="spp-tax-box1-quarter">{value.q2.toLocaleString()}</div>
      <div className="spp-tax-box1-quarter">{value.q3.toLocaleString()}</div>
      <div className="spp-tax-box1-quarter">{value.q4.toLocaleString()}</div>
      <div className="spp-tax-box1-quarter">{value.total.toLocaleString()}</div>
    </div>
  ));

  // 본문
  return (
    <div className="spp-tax">
      <div className="spp-tax-box1">
        <div className="spp-tax-box1-title">
          <div className="spp-tax-box1-text"></div>
          <div className="spp-tax-box1-quarter">
            <span>1기 예정</span>
            <span>(1분기)</span>
          </div>
          <div className="spp-tax-box1-quarter">
            <span>1기 확정</span>
            <span>(2분기)</span>
          </div>
          <div className="spp-tax-box1-quarter">
            <span>2기 예정</span>
            <span>(3분기)</span>
          </div>
          <div className="spp-tax-box1-quarter">
            <span>2기 확정</span>
            <span>(4분기)</span>
          </div>
          <div className="spp-tax-box1-quarter">총합</div>
        </div>
        {taxCalCul}
      </div>
    </div>
  );
};

export default Tax;
