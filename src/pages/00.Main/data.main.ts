import { UserUtils } from "../../utils/user.utils";

interface ActionData {
  to: string;
  name: string;
  onClick?: () => void;
}

export const titleText: { [key: string]: string } = {
  "/signup": "회원가입/로그인",
  "/withdrawal": "회원탈퇴",
  "/mySpp": "내발전소",
  "/otherSpp": "다른발전소",
  "/myInfo": "정보수정",
};

export const btnData = (logined: boolean): ActionData[] => {
  // 로그인 상태
  const actionsData1 = [
    {
      to: "/",
      name: "홈",
    },
    {
      to: "/mySpp",
      name: "내발전소",
    },
    {
      // to: "/otherSpp",
      to: "#",
      name: "다른발전소",
    },
    {
      to: "/myInfo",
      name: "정보수정",
    },
    {
      to: "/",
      name: "로그아웃",
      onClick: () => UserUtils.logOut(),
    },
    {
      to: "withdrawal",
      name: "회원탈퇴",
    },
  ];

  // 로그아웃 상태
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
