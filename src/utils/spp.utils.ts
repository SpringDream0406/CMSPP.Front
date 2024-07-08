import { NavigateFunction } from "react-router-dom";
import {
  ISRecInputData,
  ISolarDataFromBack,
  ISolarInputData,
  ISppData,
} from "../interfaces/api.interface";
import {
  IConfirmDelete,
  IDeleteOneSRecData,
  IDeleteOneSolarData,
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

  // 내발전 데이터 뿌리기
  static async dispatchSppData(
    dispatch: AppDispatch,
    navigate: NavigateFunction
  ) {
    const response = await this.fetchSppData();
    console.log(response);

    const { solarData, sRecData, kWh, recWeight } = response;
    if (!kWh || !recWeight) {
      // eslint-disable-next-line no-restricted-globals
      const confirmResult = confirm(
        "발전설비 정보 or REC 가중치 정보가 없습니다. 등록하시겠습니까?"
      );
      if (confirmResult) {
        return navigate("/myInfo");
      } else {
        return alert(
          "정확한 계산을 위하여 발전설비 정보와 REC 가중치가 없으면 이용하실 수 없습니다."
        );
      }
    }
    dispatch(sppActions.setSolarData(solarData));
    dispatch(sppActions.setSRecData(sRecData));
  }

  // 년도 필터링
  static filteringYears({ solarData, sRecData }: ISppData): number[] {
    const sppData = [...solarData, ...sRecData];
    const years = [...new Set(sppData.map((item) => item.year))].sort(
      (a, b) => b - a
    );
    return years;
  }

  // 선택년도로 데이터 필터링
  static filteringData(selectedYear: number | null, data: any) {
    if (!selectedYear) return data;
    return data?.filter((data: any) => data.year === selectedYear);
  }

  // 태양광 데이터 추가
  static async addSolarData(solarData: ISolarInputData, dispatch: AppDispatch) {
    const response = await sppApiService.addSolarData(solarData);
    if (response?.status && response?.data) {
      dispatch(sppActions.setSolarData(response?.data));
      return true;
    }
    return false;
  }

  // sRec 데이터 추가
  static async addSRecData(sRecData: ISRecInputData, dispatch: AppDispatch) {
    const response = await sppApiService.addSRecData(sRecData);
    if (response?.status && response?.data) {
      dispatch(sppActions.setSRecData(response?.data));
      return true;
    }
    return false;
  }

  // 삭제 확인 alert
  static confirmDelete({ dataName, year, month, day }: IConfirmDelete) {
    // eslint-disable-next-line no-restricted-globals
    return confirm(
      `${year}년 ${month}월 ${
        day ? `${day}일` : ""
      } ${dataName} 데이터를 삭제 하시겠습니까?`
    );
  }

  // 태양광 데이터 한 개 삭제
  static async deleteOneSolarData(
    deleteOneSolarData: IDeleteOneSolarData,
    dispatch: AppDispatch
  ) {
    const confirmResult = this.confirmDelete({
      dataName: "태양광",
      ...deleteOneSolarData,
    });
    if (confirmResult) {
      const response = await sppApiService.deleteSolarData({
        solarNumber: deleteOneSolarData.solarNumber,
      });
      if (response?.status && response?.data) {
        dispatch(sppActions.setSolarData(response?.data));
      }
    }
  }

  // sRec 데이터 한 개 삭제
  static async deleteOneSRecData(
    deleteOneSRecData: IDeleteOneSRecData,
    dispatch: AppDispatch
  ) {
    const confirmResult = this.confirmDelete({
      dataName: "REC 판매",
      ...deleteOneSRecData,
    });
    if (confirmResult) {
      const response = await sppApiService.deleteSRecData({
        sRecNumber: deleteOneSRecData.sRecNumber,
      });
      if (response?.status && response?.data) {
        dispatch(sppActions.setSRecData(response?.data));
      }
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
  static createIRecData(solarData: ISolarDataFromBack[]) {
    let remain = 0;

    const iRecData: IIRecData[] = solarData.map(
      (solarData: ISolarDataFromBack) => {
        const year = solarData.year;
        const month = solarData.month;
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
          year,
          month,
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
