import "./Spp.css";
import Solar from "./components/Solar";

const Spp = () => {
  // 본문
  return (
    <div className="spp-background">
      <div className="spp-box">
        <Solar />
        <div className="spp-rec">
          <div className="spp-rec-title">REC</div>
          <div className="spp-rec-box">box</div>
        </div>
        <div className="spp-expense">
          <div className="spp-expense-title">고정지출</div>
          <div className="spp-expense-box">box</div>
        </div>
      </div>
    </div>
  );
};

export default Spp;
