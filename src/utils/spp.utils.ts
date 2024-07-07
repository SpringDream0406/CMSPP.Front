import {
  IDeleteOneSolarData,
  ISolarData,
  ISolarDataFromBack,
  ISppData,
} from "../interfaces/api.interface";
import { ISolarTotal } from "../interfaces/utils.interface";
import { sppActions } from "../redux/sppReducer";
import { AppDispatch } from "../redux/store";
import { SppApiService } from "./services/sppApi.service";

const sppApiService = new SppApiService();

export class SppUtils {
  //
  // 내발전소 데이터 가져오기
  static async fetchSppData(): Promise<ISppData> {
    const response = await sppApiService.fetchSppData();
    if (!response?.status && !response?.data) console.log("aaa");
    return response?.data;
  }

  // 년도 필터링
  static filteringYears({ solarData, recData }: ISppData): number[] {
    const sppData = [...solarData, ...recData];
    const years = [...new Set(sppData.map((item) => item.year))].reverse();
    return years;
  }

  // 선택년도로 데이터 필터링
  static filteringData(selectedYear: number | null, data: any) {
    if (!selectedYear) return data;
    return data?.filter((data: any) => data.year === selectedYear);
  }

  // 태양광 데이터 추가
  static async addSolarData(solarData: ISolarData, dispatch: AppDispatch) {
    const response = await sppApiService.addSolarData(solarData);
    console.log(response);
    if (response?.status && response?.data) {
      dispatch(sppActions.setSolarData(response?.data));
      return true;
    }
  }

  // 태양광 데이터 삭제
  static async deleteSolarData(
    deleteOneSolarData: IDeleteOneSolarData,
    dispatch: AppDispatch
  ) {
    const response = await sppApiService.deleteSolarData(deleteOneSolarData);
    if (response?.status && response?.data) {
      dispatch(sppActions.setSolarData(response?.data));
    }
  }

  // 태양광 데이터 평균, 총합
  static solarTotal(data?: any): ISolarTotal[] {
    let sums = {
      generation: 0,
      smp: 0,
      calcul: 0,
      supplyPrice: 0,
      vat: 0,
      total: 0,
      count: 0,
    };

    data?.forEach((item: ISolarDataFromBack) => {
      sums.generation += item.generation;
      sums.smp += Number(item.smp);
      sums.calcul += Math.floor(item.generation * Number(item.smp));
      sums.supplyPrice += item.supplyPrice;
      sums.vat += Math.floor(item.supplyPrice / 10);
      sums.total += item.supplyPrice + Math.floor(item.supplyPrice / 10);
      sums.count += 1;
    });

    const sumCount = sums.count;
    const avers = {
      generation: Math.floor(sums.generation / sumCount) | 0,
      smp: Math.floor((sums.smp / sumCount) | 0),
      calcul: Math.floor((sums.calcul / sumCount) | 0),
      supplyPrice: Math.floor((sums.supplyPrice / sumCount) | 0),
      vat: Math.floor((sums.vat / sumCount) | 0),
      total: Math.floor((sums.total / sumCount) | 0),
      count: sums.count,
    };

    const returnData = [
      { name: "평균", ...avers },
      { name: "총합", ...sums },
    ];
    return returnData;
  }
}
