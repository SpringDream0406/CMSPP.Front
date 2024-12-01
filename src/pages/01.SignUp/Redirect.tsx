import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UserUtils } from "../../utils/user.utils";

const Redirect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { provider } = useParams();

  useEffect(() => {
    const test = async () => {
      const code = new URLSearchParams(location.search).get("code");
      console.log(code);

      const response = await UserUtils.signup(provider!, code!);
      console.log(response);
    };
    test();
  }, [location.search, navigate]);

  // 본문
  return <div>로그인 처리 중입니다...</div>;
};

export default Redirect;
