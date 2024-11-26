import axios from "axios";
import "./SignUp.css";

const Signup = () => {
  const signupIconsData = ["google", "kakao", "naver"];

  const signupIcons = signupIconsData.map((icons) => {
    const handleSignup = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/signup/${icons}`,
          {
            withCredentials: true, // 쿠키 포함해서 보내기
          }
        );
        // 성공적인 응답 처리 (예: 로그인 성공 후 페이지 리디렉션)
        console.log(response.data);
      } catch (error) {
        console.error("Signup failed:", error);
      }
    };

    return (
      <div className="signup-icons-box" key={icons}>
        <button onClick={handleSignup}>
          <img
            src={`/images/icons/${icons}.png`}
            alt={icons}
            className="signup-icons-icon"
          />
        </button>
      </div>
    );
  });

  // 본문
  return (
    <div className="signup-background">
      <div className="signup-box">
        <div className="signup-icons">{signupIcons}</div>
      </div>
    </div>
  );
};

export default Signup;
