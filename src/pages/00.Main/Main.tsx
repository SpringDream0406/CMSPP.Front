import "./Main.css";
import { Outlet, NavLink } from "react-router-dom";
import { Utils } from "../../utils/utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { actionData } from "./data.main";

const Main = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state: RootState) => state.reducer.accessToken
  );
  const [titleText, setTitleText] = useState<string>("CM Solar Power Plant");

  // 리프레시토큰 있으면 엑세스토큰 받아다가 redux에 저장
  useEffect(() => {
    Utils.saveAccessToken(dispatch);
  }, [dispatch]);

  // 이미지랑 제목
  const mainTitle = (
    <>
      <img src="spp3.png" alt="icon" />
      <div className="main-title-txt">{titleText}</div>
    </>
  );

  // 페이지 이동 버튼들
  const actionsData = actionData(dispatch, accessToken);
  const actions = (
    <>
      {actionsData.map((items) => (
        <NavLink
          to={items.to}
          onClick={() => {
            setTitleText(items.titleText);
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
      <div className="main-title">{mainTitle}</div>
      <div className="main-actions">{actions}</div>
      <div className="main-outlet">
        <Outlet />
      </div>
      <div className="main-info">연락처: cmspp0406@gmail.com</div>
    </div>
  );
};

export default Main;
