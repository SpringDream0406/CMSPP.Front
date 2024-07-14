import { isAxiosError } from "axios";
import { IMyInfo } from "../../interfaces/api.interface";
import { UserUtils } from "../user.utils";
import { BackApiService } from "./backApi.service";

const backApiService = new BackApiService();

export class UserApiService {
  //
  // 회원탈퇴
  async withdrawal(): Promise<void> {
    try {
      const response = await backApiService.backPostWithAccessToken({
        url: process.env.REACT_APP_BACK_WITHDRAWAL!,
      });
      if (response.status) {
        alert("회원탈퇴가 정상적으로 이루어졌습니다.");
        UserUtils.logOut();
      }
    } catch (error) {
      console.error(error);
      alert("회원 탈퇴에 실패했습니다.");
    }
  }

  // myInfo 업데이트
  async updateMyInfo(myInfo: IMyInfo) {
    try {
      const response = await backApiService.backPostWithAccessToken({
        url: process.env.REACT_APP_BACK_UPDATEMYINFO!,
        data: myInfo,
      });
      return response;
    } catch (error) {
      if (isAxiosError(error) && error.response?.data.message === "중복")
        return alert("등록된 사업자 번호 입니다.");
      console.error(error);
      alert("내 정보를 등록/업데이트 하는데 실패했습니다.");
    }
  }

  // myInfo 가져오기
  async fetchMyInfo() {
    try {
      const response = await backApiService.backGetWithAccessToken({
        url: process.env.REACT_APP_BACK_FETCH_MYINFO_PATH!,
      });
      return response;
    } catch (error) {
      console.error(error);
      alert("내 정보를 가져오는데 실패했습니다.");
    }
  }
}
