import "./Spp.css";
import Solar from "./03-01.Solar/Solar";
import SRec from "./03-02.Rec/SRec";
import Expense from "./03-03.Expense/Expense";
import SppSelectYears from "./SppSelectYears";
import IRec from "./03-02.Rec/IRec";
import Tax from "./03-04.Tax/Tax";
import FixedExpense from "./03-03.Expense/FixedExpense";

const Spp = () => {
  // 본문
  return (
    <div className="spp-background">
      <div className="spp-select">
        <SppSelectYears />
      </div>
      <div className="spp-box1">
        <Solar />
        <IRec />
        <SRec />
      </div>
      <div className="spp-box2">
        <Expense />
        <FixedExpense />
        <Tax />
      </div>
    </div>
  );
};

export default Spp;
