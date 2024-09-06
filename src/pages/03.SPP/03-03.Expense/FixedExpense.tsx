import { useDispatch, useSelector } from "react-redux";
import "./Expense.css";
import { RootState } from "../../../redux/store";
import InputFixedExpense from "./InputFixedExpense";
import { SppUtils } from "../../../utils/spp.utils";
import { Utils } from "../../../utils/utils";

const FixedExpense = () => {
  const dispatch = useDispatch();
  const filteredFixedExpense = useSelector(
    (state: RootState) => state.sppReducer.filteredFixedExpense
  ); // 필터링된 고정 지출 데이터

  //
  // 아이템 타이틀
  const itemsTitle = (
    <div className="spp-box-box1-items-title spp-box-box1-items-title-ex">
      <div className="spp-fe-deleteBtn"></div>
      <div className="spp-fe-period">기간</div>
      <div className="spp-fe-feName">지출명</div>
      <div className="spp-fe-fePrice">지출액</div>
      <div className="spp-fe-fePrice-year">지출액(년)</div>
    </div>
  );

  // 아이템들
  const items = (
    <div className="spp-box-box1-items-box">
      {filteredFixedExpense?.map((fixedExpense, index) => {
        const {
          feNumber,
          startYear,
          startMonth,
          endYear,
          endMonth,
          feName,
          fePrice,
          createdAt,
        } = fixedExpense;
        const feDate = `${startYear}.${startMonth}~${endYear}.${endMonth}`;
        return (
          <span
            className="spp-box-box1-items"
            key={index}
            title={Utils.makeCreatedAt(createdAt)}
          >
            <button
              className="spp-fe-deleteBtn"
              onClick={() =>
                SppUtils.deleteOneFixedExpense(
                  { feNumber, feName, fePrice },
                  dispatch
                )
              }
            >
              ㅡ
            </button>
            <div className="spp-fe-period">{feDate}</div>
            <div className="spp-fe-feName">{feName}</div>
            <div className="spp-fe-fePrice">{fePrice.toLocaleString()}</div>
            <div className="spp-fe-fePrice-year">
              {(fePrice * 12).toLocaleString()}
            </div>
          </span>
        );
      })}
    </div>
  );

  // 합계&평균
  const totals = SppUtils.fixedExpenseTotal(filteredFixedExpense);
  const total = (
    <div className="spp-box-box2-total-box">
      <div className="spp-box-box2-total-title-box spp-box-box2-total-title-box-ex">
        <span className="spp-fe-total-text"></span>
        <span className="spp-fe-total-total">지출액</span>
        <span className="spp-fe-total-total-year">지출액(년)</span>
      </div>
      {totals.map((data, index) => (
        <div className="spp-box-box2-total-item-box" key={index}>
          <span className="spp-fe-total-text">{data.name}</span>
          <span
            className="spp-fe-total-total"
            title={data.total.toLocaleString()}
          >
            {data.total.toLocaleString()}
          </span>
          <span
            className="spp-fe-total-total-year"
            title={(data.total * 12).toLocaleString()}
          >
            {(data.total * 12).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );

  // 본문
  return (
    <div className="spp-fixedExpense">
      <div className="spp-items-title">
        고정 지출
        <span className="spp-items-title-count">
          {filteredFixedExpense ? `${filteredFixedExpense.length}건` : ""}
        </span>
      </div>
      <div className="spp-box-box1">
        {itemsTitle}
        {items}
      </div>
      <div className="spp-box-box2">
        {total}
        <InputFixedExpense />
      </div>
    </div>
  );
};

export default FixedExpense;
