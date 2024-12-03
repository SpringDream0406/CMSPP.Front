import { useEffect } from "react";
import { UserUtils } from "../../utils/user.utils";

const SetLogin = () => {
  useEffect(() => {
    UserUtils.setCookieExpires();
    window.location.href = "/";
  });

  return <div></div>;
};

export default SetLogin;
