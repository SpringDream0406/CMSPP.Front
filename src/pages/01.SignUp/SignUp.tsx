import "./SignUp.css";

const Signup = () => {
  const signupIconsData = ["google", "kakao", "naver"];

  const signupIcons = signupIconsData.map((icons) => {
    const handleSignup = () => {
      // 리디렉션으로 인증 요청을 보냄
      window.location.href = `${process.env.REACT_APP_BACK_URL}/signup/${icons}`;
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
