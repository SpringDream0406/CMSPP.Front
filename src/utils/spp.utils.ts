import {
  IDeleteOneSolarData,
  ISolarData,
  ISolarDataFromBack,
  ISppData,
} from "../interfaces/api.interface";
import {
  IIRecData,
  IIRecTotal,
  ISolarTotal,
} from "../interfaces/utils.interface";
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

  // 평균 데이터 반환 함수
  static getAversData(sums: any, sumCount: number): any {
    return Object.entries(sums).reduce((acc, [key, value]) => {
      acc[key] = Math.floor((value as any) / sumCount);
      return acc;
    }, {} as any);
  }

  // 태양광 데이터 평균, 총합
  static solarTotal(SolarData: ISolarDataFromBack[]): ISolarTotal[] {
    let sums = {
      generation: 0,
      smp: 0,
      calcul: 0,
      supplyPrice: 0,
      vat: 0,
      total: 0,
    };

    SolarData?.forEach((item: ISolarDataFromBack) => {
      sums.generation += item.generation;
      sums.smp += Number(item.smp);
      sums.calcul += Math.floor(item.generation * Number(item.smp));
      sums.supplyPrice += item.supplyPrice;
      sums.vat += Math.floor(item.supplyPrice / 10);
      sums.total += item.supplyPrice + Math.floor(item.supplyPrice / 10);
    });

    const sumCount = SolarData.length;
    const avers = this.getAversData(sums, sumCount);

    return [
      { name: "평균", ...avers },
      { name: "총합", ...sums },
    ];
  }

  // iRec 데이터 생성
  static createIRecData(filteredSolarData: ISolarDataFromBack[]) {
    let remain = 0;

    const iRecData: IIRecData[] = filteredSolarData.map(
      (solarData: ISolarDataFromBack) => {
        const createdAt = solarData.createdAt;
        const generationInKwh = solarData.generation / 1000;
        remain += generationInKwh % 1;

        let issuance;
        let fee;

        if (remain > 1) {
          issuance = Math.floor(generationInKwh) + 1;
          remain -= 1;
        } else {
          issuance = Math.floor(generationInKwh);
        }

        fee = issuance * 55;

        return {
          issuance,
          fee,
          remain,
          createdAt,
        };
      }
    );
    return iRecData;
  }

  // iRec 데이터 평균, 총합
  static iRecTotal(iRecData: IIRecData[]): IIRecTotal[] {
    let sums = {
      issuance: 0,
      fee: 0,
      remain: 0,
    };

    iRecData?.forEach((item: IIRecData) => {
      sums.issuance += item.issuance;
      sums.fee += item.fee;
      sums.remain += item.remain;
    });

    const sumCount = iRecData.length;
    const avers = this.getAversData(sums, sumCount);
    avers["remain"] = (sums.remain / sumCount).toFixed(3);

    return [
      { name: "평균", ...avers },
      { name: "총합", ...sums },
    ];
  }
}
