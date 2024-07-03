import { Dispatch, SetStateAction } from "react";
import { BackApiService } from "./services/backApi.service";
import { Utils } from "./utils";
import {
  IDeleteOneSolarData,
  ISolarData,
  ISolarDataFromBack,
  ISppData,
} from "../interfaces/api.interface";
import { SppApiService } from "./services/sppApi.service";

const backApiService = new BackApiService();
const sppApiService = new SppApiService();

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

  // 내발전소 데이터 가져오기
  static async fetchSppData(): Promise<ISppData> {
    const response = await sppApiService.fetchSppData();
    console.log(response);

    if (!response?.status && !response?.data) console.log("aaa");
    return response?.data;
  }

  // 태양광 데이터 추가
  static async addSolarData(
    solarData: ISolarData,
    setSolarData2: Dispatch<SetStateAction<ISolarDataFromBack[] | undefined>>
  ) {
    const response = await sppApiService.addSolarData(solarData);
    if (response?.status && response?.data) {
      setSolarData2(response?.data);
      return true;
    }
  }

  // 태양광 데이터 삭제
  static async deleteSolarData(
    deleteOneSolarData: IDeleteOneSolarData,
    setSolarData2: Dispatch<SetStateAction<ISolarDataFromBack[] | undefined>>
  ) {
    const response = await sppApiService.deleteSolarData(deleteOneSolarData);
    if (response?.status && response?.data) {
      setSolarData2(response?.data);
    }
  }
}
