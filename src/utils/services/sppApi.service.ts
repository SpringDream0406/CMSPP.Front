import { isAxiosError } from "axios";
import { BackApiService } from "./backApi.service";
import {
  IExpenseInput,
  IFixedExpenseInput,
  ISRecInput,
  ISolarInput,
} from "../../interfaces/api.interface";

const backApiService = new BackApiService();

export class SppApiService {
  //
  // 내 발전소 데이터 가져오기
  async fetchSpp() {
    try {
      const response = await backApiService.backWithAccessToken({
        method: "get",
        url: `${process.env.REACT_APP_BACK_SPP}`,
      });
      return response;
    } catch (error) {
      console.error(error);
      alert("내발전소 데이터를 가져오는데 실패했습니다.");
    }
  }

  // solar 데이터 추가
  async addSolar(solarInput: ISolarInput) {
    try {
      const response = await backApiService.backWithAccessToken({
        method: "put",
        url: `${process.env.REACT_APP_BACK_SPP}/solar`,
        data: solarInput,
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
  async addSRec(sRecInput: ISRecInput) {
    try {
      const response = await backApiService.backWithAccessToken({
        method: "put",
        url: `${process.env.REACT_APP_BACK_SPP}/sRec`,
        data: sRecInput,
      });
      return response;
    } catch (error) {
      console.error(error);
      alert("REC 판매 데이터 추가에 실패했습니다.");
    }
  }

  // expense 데이터 추가
  async addExpense(expenseInput: IExpenseInput) {
    try {
      const response = await backApiService.backWithAccessToken({
        method: "put",
        url: `${process.env.REACT_APP_BACK_SPP}/expense`,
        data: expenseInput,
      });
      return response;
    } catch (error) {
      console.error(error);
      alert("지출 데이터 추가에 실패했습니다.");
    }
  }

  // fixedExpense 데이터 추가
  async addFixedExpense(fixedExpenseInput: IFixedExpenseInput) {
    try {
      const response = await backApiService.backWithAccessToken({
        method: "put",
        url: `${process.env.REACT_APP_BACK_SPP}/fixedExpense`,
        data: fixedExpenseInput,
      });
      return response;
    } catch (error) {
      console.error(error);
      alert("고정지출 데이터 추가에 실패했습니다.");
    }
  }

  // solar 데이터 삭제
  async deleteSolar(solarNumber: number) {
    try {
      const response = await backApiService.backWithAccessToken({
        method: "delete",
        url: `${process.env.REACT_APP_BACK_SPP}/solar/${solarNumber}`,
      });
      return response;
    } catch (error) {
      console.error(error);
      alert("태양광 데이터 삭제에 실패했습니다.");
    }
  }

  // sREc 데이터 삭제
  async deleteSRec(sRecNumber: number) {
    try {
      const response = await backApiService.backWithAccessToken({
        method: "delete",
        url: `${process.env.REACT_APP_BACK_SPP}/sRec/${sRecNumber}`,
      });
      return response;
    } catch (error) {
      console.error(error);
      alert("REC 판매 데이터 삭제에 실패했습니다.");
    }
  }

  // expense 데이터 삭제
  async deleteExpense(eNumber: number) {
    try {
      const response = await backApiService.backWithAccessToken({
        method: "delete",
        url: `${process.env.REACT_APP_BACK_SPP}/expense/${eNumber}`,
      });
      return response;
    } catch (error) {
      console.error(error);
      alert("지출 데이터 삭제에 실패했습니다.");
    }
  }

  // fixedExpense 데이터 삭제
  async deleteFixedExpense(feNumber: number) {
    try {
      const response = await backApiService.backWithAccessToken({
        method: "delete",
        url: `${process.env.REACT_APP_BACK_SPP}/fixedExpense/${feNumber}`,
      });
      return response;
    } catch (error) {
      console.error(error);
      alert("고정 지출 데이터 삭제에 실패했습니다.");
    }
  }
}
