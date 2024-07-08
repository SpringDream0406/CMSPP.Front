import { isAxiosError } from "axios";
import { BackApiService } from "./backApi.service";
import {
  ISRecInputData,
  ISolarInputData,
  ISppApiServiceDeleteOneSRecData,
  ISppApiServiceDeleteOneSolarData,
} from "../../interfaces/api.interface";

const backApiService = new BackApiService();

export class SppApiService {
  //
  // 내 발전소 데이터 가져오기
  async fetchSppData() {
    try {
      const response = await backApiService.backGetWithAccessToken({
        url: process.env.REACT_APP_BACK_FETCH_SPPDATA_PATH!,
      });
      return response;
    } catch (error) {
      console.error(error);
      alert("내발전소 데이터를 가져오는데 실패했습니다.");
    }
  }

  // 태양광 데이터 가져오기
  // async fetchSolarData() {
  //   try {
  //     const response = await backApiService.backGetWithAccessToken({
  //       url: process.env.REACT_APP_BACK_FETCH_SOLARDATA_PATH!,
  //     });
  //     return response;
  //   } catch (error) {
  //     console.error(error);
  //     alert("태양광 데이터를 가져오는데 실패했습니다.");
  //   }
  // }

  // 태양광 데이터 추가
  async addSolarData(solarInputData: ISolarInputData) {
    try {
      const response = await backApiService.backPostWithAccessToken({
        url: process.env.REACT_APP_BACK_ADD_SOLARDATA_PATH!,
        data: solarInputData,
      });
      return response;
    } catch (error) {
      if (isAxiosError(error) && error.response?.data.message === "중복")
        return alert("이미 입력된 년-월 내용이 있습니다.");
      console.error(error);
      alert("태양광 데이터 추가에 실패했습니다.");
    }
  }

  // sRec 데이터 추가
  async addSRecData(sRecInputData: ISRecInputData) {
    try {
      const response = await backApiService.backPostWithAccessToken({
        url: process.env.REACT_APP_BACK_ADD_SRECDATA_PATH!,
        data: sRecInputData,
      });
      return response;
    } catch (error) {
      console.error(error);
      alert("REC 판매 데이터 추가에 실패했습니다.");
    }
  }

  // 태양광 데이터 삭제
  async deleteSolarData(deleteOneSolarData: ISppApiServiceDeleteOneSolarData) {
    try {
      const response = await backApiService.backPostWithAccessToken({
        url: process.env.REACT_APP_BACK_DELETE_SOLARDATA_PATH!,
        data: deleteOneSolarData,
      });
      return response;
    } catch (error) {
      console.error(error);
      alert("태양광 데이터 삭제에 실패했습니다.");
    }
  }

  // sREc 데이터 삭제
  async deleteSRecData(deleteOneSRecData: ISppApiServiceDeleteOneSRecData) {
    try {
      const response = await backApiService.backPostWithAccessToken({
        url: process.env.REACT_APP_BACK_DELETE_SRECDATA_PATH!,
        data: deleteOneSRecData,
      });
      return response;
    } catch (error) {
      console.error(error);
      alert("REC 판매 데이터 삭제에 실패했습니다.");
    }
  }
}
