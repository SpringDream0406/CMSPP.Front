import { Dispatch } from "redux";
import { Utils } from "../../utils/utils";

interface ActionData {
  to: string;
  titleText: string;
  name: string;
  onClick?: () => void;
}

export const actionData = (dispatch: Dispatch, accessToken: string) => {
  const actionsData1: ActionData[] = [
    {
      to: "/",
      titleText: "CM Solar Power Plant",
      name: "홈",
    },
    {
      to: "/",
      titleText: "CM Solar Power Plant",
      name: "로그아웃",
      onClick: () => Utils.logOut(dispatch),
    },
    {
      to: "withdrawal",
      titleText: "회원탈퇴",
      name: "회원탈퇴",
    },
  ];

  const actionsData2: ActionData[] = [
    {
      to: "/",
      titleText: "CM Solar Power Plant",
      name: "홈",
    },
    {
      to: "signup",
      titleText: "회원가입/로그인",
      name: "회원가입/로그인",
    },
  ];

  return accessToken ? actionsData1 : actionsData2;
};
