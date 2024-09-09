import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";
import { BackApiService } from "./services/backApi.service";
import { UserApiService } from "./services/userApi.service";
import { AppDispatch } from "../redux/store";
import { sppActions } from "../redux/sppReducer";
import { IMyInfo } from "../interfaces/api.interface";

const backApiService = new BackApiService();
const userApiService = new UserApiService();

export class UserUtils {
  //
  // 로컬스토리지에 엑세스토큰 있나 체크
  static checkAccessTokenFromLocalStorage(): boolean {
    const accessToken = this.getAccessTokenFromLocalStorage();
    return !!accessToken;
  }

  // 로컬스토리지에서 엑세스토큰 가져오기
  static getAccessTokenFromLocalStorage(): string | null {
    return localStorage.getItem("accessToken");
  }

  // 로컬스토리지에 엑세스토큰 저장하기
  static setAccessTokenToLocalStorage(accessToken: string): void {
    localStorage.setItem("accessToken", accessToken);
  }

  // 로컬스토리지의 엑세스토큰 삭제하기
  static removeAccessTokenFromLocalStorage(): void {
    localStorage.removeItem("accessToken");
  }

  // 리프레시토큰 쿠키 있나 체크
  static checkRefreshToken(): string | undefined {
    return Cookies.get("refreshToken");
  }

  // 리프레시토큰 삭제
  static removeRefreshToken(): void {
    Cookies.remove("refreshToken");
  }

  // 리프레시토큰 쿠키 있으면 엑세스토큰 받아다가 localStorage에 저장, 로그인상태로 변경
  static async saveAccessToken(
    setLogined: Dispatch<SetStateAction<boolean>>
  ): Promise<void> {
    if (this.checkRefreshToken()) {
      await backApiService.getAccessToken();
      setLogined(this.checkAccessTokenFromLocalStorage());
    }
  }

  // 로그아웃 처리
  static logOut(): void {
    this.removeRefreshToken();
    this.removeAccessTokenFromLocalStorage();
    window.location.href = "/";
  }

  // 회원탈퇴
  static async withdrawal() {
    await userApiService.withdrawal();
  }

  // myInfo 등록하기
  static async updateMyInfo(myInfo: IMyInfo, dispatch: AppDispatch) {
    const response = await userApiService.updateMyInfo(myInfo);
    if (response?.status) {
      alert("내 정보를 업데이트 했습니다.");
    }
  }

  // myInfo 가져오기
  static async fetchMyInfo(
    dispatch: AppDispatch,
    setAddress: Dispatch<SetStateAction<string>>
  ) {
    const response = await userApiService.fetchMyInfo();
    if (response?.status && response?.data) {
      dispatch(sppActions.setMyInfo({ ...response.data }));
      setAddress(response.data.address);
    }
  }

  // 사업자 등록번호 검증조회
  static async checkBusinessNumber(businessNumber: number): Promise<Boolean> {
    const response = await backApiService.checkBusinessNumber(businessNumber);
    if (!response?.status || !(response?.data.data.length > 0)) return false;
    const result = response.data.data[0].tax_type;
    if (result === "국세청에 등록되지 않은 사업자등록번호입니다.") {
      alert(result);
      return false;
    }
    return true;
  }
}
