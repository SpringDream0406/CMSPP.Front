import { useEffect } from "react";
import { UserUtils } from "../../utils/user.utils";

const SetLogin = () => {
  useEffect(() => {
    UserUtils.setRefreshTokenExpires();
    window.location.href = "/";
  });

  return <div></div>;
};

export default SetLogin;
