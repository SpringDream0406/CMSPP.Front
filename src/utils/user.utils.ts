import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";
import { BackApiService } from "./services/backApi.service";
import { UserApiService } from "./services/userApi.service";
import { IKWhAndrecWeightData } from "../interfaces/utils.interface";

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

  // kWh, REC 가중치 등록하기
  static async updatekWhAndRecWeight(
    kWhAndRecWeightData: IKWhAndrecWeightData
  ) {
    const response = await userApiService.updatekWhAndRecWeight(
      kWhAndRecWeightData
    );
    if (response?.status) {
      alert("발전설비와 REC 가중치를 등록했습니다.");
    }
  }
}
