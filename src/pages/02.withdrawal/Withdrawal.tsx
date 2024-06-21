import "./Withdrawal.css";
import { BackApiUtils } from "../../utils/backApi.utils";
import { useState } from "react";

const Withdrawal = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const isBtnDisabled = inputValue !== "회원탈퇴";

  // 본문
  return (
    <div className="withdrawal-background">
      <div className="withdrawal-notice">
        <div>안녕하세요. CMSPP의 개발자 CM입니다.</div>
        <div>
          지금까지 입력해주신 발전정보는 차후 데이터로 활용될 수 있습니다.
        </div>
        <div>
          이를 원치 않으실 경우 입력하셨던 데이터를 삭제 후 회원탈퇴를
          진행하시길 바랍니다.
        </div>
      </div>
      <br />
      <br />
      <div>
        안내 사항을 모두 읽었으며, 동의하실 경우 아래에 "회원탈퇴" 를 입력 후,
        확인 버튼을 눌러주세요.
      </div>
      <div className="withdrawal-box">
        <input
          type="text"
          placeholder={`"회원탈퇴" 를 입력해주세요.`}
          className="withdrawal-input"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          className="withdrawal-btn"
          onClick={() => BackApiUtils.withdrawal()}
          disabled={isBtnDisabled}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default Withdrawal;
