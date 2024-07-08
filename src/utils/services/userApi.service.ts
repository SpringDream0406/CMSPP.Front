import { IKWhAndrecWeightData } from "../../interfaces/utils.interface";
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

  // kWh, REC 가중치 등록하기
  async updatekWhAndRecWeight(kWhAndRecWeightData: IKWhAndrecWeightData) {
    try {
      const response = await backApiService.backPostWithAccessToken({
        url: process.env.REACT_APP_BACK_UPDATEKWHANDRECWEIGHT!,
        data: kWhAndRecWeightData,
      });
      return response;
    } catch (error) {
      console.error(error);
      alert("발전설비와 REC 가중치를 등록하는데 실패했습니다.");
    }
  }
}
