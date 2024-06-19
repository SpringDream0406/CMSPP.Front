import "./Withdrawal.css";
import { BackApiUtils } from "../../utils/backApi.utils";
import { useEffect } from "react";

const Withdrawal = () => {
  // 본문
  useEffect(() => {});
  return (
    <div className="withdrawal-background">
      <div>asdfasfa</div>
      <button onClick={() => BackApiUtils.withdrawal()}>탈퇴</button>
    </div>
  );
};

export default Withdrawal;
