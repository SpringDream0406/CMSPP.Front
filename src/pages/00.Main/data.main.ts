import { BackApiUtils } from "../../utils/backApi.utils";
import { Utils } from "../../utils/utils";

interface ActionData {
  to: string;
  name: string;
  onClick?: () => void;
}

export const titleText: { [key: string]: string } = {
  "/signup": "회원가입/로그인",
  "/withdrawal": "회원탈퇴",
};

export const actionData = (logined: boolean): ActionData[] => {
  const actionsData1 = [
    {
      to: "/",
      name: "홈",
    },
    {
      to: "/",
      name: "로그아웃",
      onClick: () => Utils.logOut(),
    },
    {
      to: "withdrawal",
      name: "회원탈퇴",
    },
  ];

  const actionsData2 = [
    {
      to: "/",
      name: "홈",
    },
    {
      to: "signup",
      name: "회원가입/로그인",
    },
  ];

  return logined ? actionsData1 : actionsData2;
};
