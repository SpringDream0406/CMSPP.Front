import "./Expense.css";
import InputExpense from "./InputExpense";

const Expense = () => {
  // 본문
  return (
    <div className="spp-expense">
      <div className="spp-items-title">
        지출
        <span className="spp-items-title-count">1</span>
      </div>
      <div className="spp-box2-box1">box1</div>
      <div className="spp-box2-box2">
        box2
        <InputExpense />
      </div>
    </div>
  );
};

export default Expense;
