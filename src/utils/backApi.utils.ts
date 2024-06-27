import { Dispatch, SetStateAction } from "react";
import { BackApiService } from "./backApi.service";
import { Utils } from "./utils";

const backApiService = new BackApiService();

export class BackApiUtils {
  //
  // 리프레시토큰 쿠키 있으면 엑세스토큰 받아다가 localStorage에 저장, 로그인상태로 변경
  static async saveAccessToken(
    setLogined: Dispatch<SetStateAction<boolean>>
  ): Promise<void> {
    if (Utils.checkRefreshToken()) {
      await backApiService.getAccessToken();
      setLogined(Utils.checkAccessTokenFromLocalStorage());
    }
  }

  // 회원탈퇴
  static async withdrawal() {
    const response = await backApiService.backPostWithAccessToken({
      url: "/withdrawal",
    });
    if (response?.status) {
      alert("회원탈퇴가 정상적으로 이루어졌습니다.");
      Utils.logOut();
    }
  }

  // 태양광 데이터 전송
  static async addSolarData(solarData: ISolarData) {
    const response = await backApiService.backPostWithAccessToken({
      url: "/addSolar",
      data: solarData,
    });
    if (response?.status) {
      console.log(response);
    }
  }
}

interface ISolarData {
  yearAndMonth: string;
  generation: number;
  smp: number;
  supplyPrice: number;
}
