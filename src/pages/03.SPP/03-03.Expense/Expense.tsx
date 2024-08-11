import "./Expense.css";
import InputExpense from "./InputExpense";

const Expense = () => {
  //
  // 아이템 타이틀
  const itemsTitle = (
    <div className="spp-box2-box1-items-title">
      <div className="spp-ex-deleteBtn"></div>
      <div className="spp-ex-year">년</div>
      <div className="spp-ex-month">월</div>
      <div className="spp-ex-day">일</div>
      <div className="spp-ex-name">지출명</div>
      <div className="spp-ex-price">지출액</div>
    </div>
  );

  // 아이템들
  const items = <div className="spp-box2-box1-items-box"></div>;

  // 본문
  return (
    <div className="spp-expense">
      <div className="spp-items-title">
        지출
        <span className="spp-items-title-count">1</span>
      </div>
      <div className="spp-box2-box1">
        {itemsTitle}
        {items}
      </div>
      <div className="spp-box2-box2">
        box2
        <InputExpense />
      </div>
    </div>
  );
};

export default Expense;
