import "./Main.css";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { btnData, titleText } from "./data.main";
import { UserUtils } from "../../utils/user.utils";

const Main = () => {
  const [logined, setLogined] = useState<boolean>(false); // 로그인 상태에 따라 버튼들 바뀜
  const { pathname } = useLocation(); // 현재 경로로 타이틀 변경

  // 리프레시토큰 있으면 엑세스토큰 받아다가 localStorage에 저장 = 로그인
  useEffect(() => {
    UserUtils.saveAccessToken(setLogined);
  }, []);

  // 페이지 이동 버튼들
  const mainBtnData = btnData(logined);
  const mainBtns = (
    <>
      {mainBtnData.map((items) => (
        <NavLink
          to={items.to}
          onClick={() => {
            if (items.onClick) items.onClick();
          }}
          className={"main-actions-bts"}
          key={items.name}
        >
          {items.name}
        </NavLink>
      ))}
    </>
  );

  // 본문
  return (
    <div className="main-background">
      <div className="main-title">
        {titleText[pathname] || "CM Solar Power Plant"}
      </div>
      <div className="main-actions">{mainBtns}</div>
      <div className="main-outlet">
        <Outlet />
      </div>
      <div className="main-info">cmspp0406@gmail.com</div>
    </div>
  );
};

export default Main;
