import Cookies from "js-cookie";
import { Dispatch } from "redux";
import { reducerActions } from "../redux/reducer";
import { ApiUtils } from "./api.utils";

const apiUtils = new ApiUtils();

export class Utils {
  // 리프레시토큰 쿠키 있나 체크
  static checkRefreshToken(): string | undefined {
    return Cookies.get("refreshToken");
  }

  // 리프레시토큰 쿠키 있으면 엑세스토큰 받아다가 redux저장
  static async saveAccessToken(dispatch: Dispatch) {
    if (this.checkRefreshToken()) {
      const accessToken = await apiUtils.getAccessToken();
      dispatch(reducerActions.setAccessToken(accessToken));
    }
  }

  // 로그아웃 => 리프레시토큰 삭제, 엑세스토큰 삭제, main페이지로 이동
  static logOut(dispatch: Dispatch) {
    Cookies.remove("refreshToken");
    dispatch(reducerActions.setAccessToken(""));
  }

  // 회원탈퇴
  static async withdrawal(accessToken: string) {
    return apiUtils.withdrawal(accessToken);
  }
}
