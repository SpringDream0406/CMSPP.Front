import { Link } from "react-router-dom";
import "./SignUp.css";

const Signup = () => {
  const signupIconsData = ["google", "kakao", "naver"];
  const signupIcons = signupIconsData.map((icons) => {
    return (
      <div className="signup-icons-box" key={icons}>
        <Link to={`http://localhost:3009/signup/${icons}`}>
          <img
            src={`/images/icons/${icons}.png`}
            alt={icons}
            className="signup-icons-icon"
          />
        </Link>
      </div>
    );
  });

  // 본문
  return (
    <div className="signup-background">
      <div className="signup-box">
        <div className="signup-message">회원가입</div>
        <div className="signup-icons">{signupIcons}</div>
      </div>
    </div>
  );
};

export default Signup;
