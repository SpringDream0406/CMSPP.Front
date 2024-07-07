import { UserUtils } from "../user.utils";
import { BackApiService } from "./backApi.service";

const backApiService = new BackApiService();

export class UserApiService {
  //
  // 회원탈퇴
  async Withdrawal(): Promise<void> {
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
}
