import { useDispatch, useSelector } from "react-redux";
import "./Expense.css";
import InputExpense from "./InputExpense";
import { RootState } from "../../../redux/store";
import { SppUtils } from "../../../utils/spp.utils";
import { Utils } from "../../../utils/utils";

const Expense = () => {
  const dispatch = useDispatch();
  const filteredExpense = useSelector(
    (state: RootState) => state.sppReducer.filteredExpense
  ); // 선택된 년도의 지출 데이터

  //
  // 아이템 타이틀
  const itemsTitle = (
    <div className="spp-box-box1-items-title spp-box-box1-items-title-ex">
      <div className="spp-ex-deleteBtn"></div>
      <div className="spp-ex-year">년</div>
      <div className="spp-ex-month">월</div>
      <div className="spp-ex-day">일</div>
      <div className="spp-ex-eName">지출명</div>
      <div className="spp-ex-ePrice">지출액</div>
    </div>
  );

  // 아이템들
  const items = (
    <div className="spp-box-box1-items-box">
      {filteredExpense?.map((expense, index) => {
        const { eNumber, year, month, day, eName, ePrice, createdAt } = expense;
        return (
          <span
            className="spp-box-box1-items"
            key={index}
            title={Utils.makeCreatedAt(createdAt)}
          >
            <button
              className="spp-ex-deleteBtn"
              onClick={() =>
                SppUtils.deleteOneExpense(
                  { eNumber, year, month, day },
                  dispatch
                )
              }
            >
              ㅡ
            </button>
            <div className="spp-ex-year">{year}</div>
            <div className="spp-ex-month">{month}</div>
            <div className="spp-ex-day">{day}</div>
            <div className="spp-ex-eName">{eName}</div>
            <div className="spp-ex-ePrice">{ePrice}</div>
          </span>
        );
      })}
    </div>
  );

  // 합계&평균
  const totals = SppUtils.expenseTotal(filteredExpense);
  const total = (
    <div className="spp-box-box2-total-box">
      <div className="spp-box-box2-total-title-box spp-box-box2-total-title-box-ex">
        <span className="spp-ex-total-text"></span>
        <span className="spp-ex-total-total">지출액</span>
      </div>
      {totals.map((data, index) => (
        <div className="spp-box-box2-total-item-box" key={index}>
          <span className="spp-ex-total-text">{data.name}</span>
          <span
            className="spp-ex-total-total"
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
    <div className="spp-expense">
      <div className="spp-items-title">
        지출
        <span className="spp-items-title-count">
          {filteredExpense ? `${filteredExpense.length}건` : ""}
        </span>
      </div>
      <div className="spp-box-box1">
        {itemsTitle}
        {items}
      </div>
      <div className="spp-box-box2">
        {total}
        <InputExpense />
      </div>
    </div>
  );
};

export default Expense;
