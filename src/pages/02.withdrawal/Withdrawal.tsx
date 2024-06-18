import { useSelector } from "react-redux";
import "./Withdrawal.css";
import { RootState } from "../../redux/store";
import { Utils } from "../../utils/utils";

const Withdrawal = () => {
  const accessToken = useSelector(
    (state: RootState) => state.reducer.accessToken
  );

  // 본문
  return (
    <div>
      <button onClick={() => Utils.withdrawal(accessToken)}>탈퇴</button>
    </div>
  );
};

export default Withdrawal;
