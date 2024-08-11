import { NavigateFunction } from "react-router-dom";
import {
  IExpenseInput,
  IFixedExpenseInput,
  IMyInfo,
  ISRecFromBack,
  ISRecInput,
  ISolarFromBack,
  ISolarInput,
  ISpp,
} from "../interfaces/api.interface";
import {
  IConfirmDelete,
  IDeleteOneSRec,
  IDeleteOneSolar,
  IFilteringYears,
  IIRec,
  IIRecTotal,
  ISRecTotal,
  ISolarTotal,
} from "../interfaces/utils.interface";
import { sppActions } from "../redux/sppReducer";
import { AppDispatch } from "../redux/store";
import { SppApiService } from "./services/sppApi.service";

const sppApiService = new SppApiService();

export class SppUtils {
  //
  // 내발전소 데이터 가져오기
  static async fetchSpp(): Promise<ISpp> {
    const response = await sppApiService.fetchSpp();
    if (!response?.status && !response?.data) console.log("데이터 문제 발생");
    return response?.data;
  }

  // 내발전 데이터 뿌리기
  static async dispatchSpp(dispatch: AppDispatch, navigate: NavigateFunction) {
    const response = await this.fetchSpp();
    console.log(response);

    const {
      solar,
      sRec,
      kWh,
      expense,
      fixedExpense,
      recWeight,
      businessNumber,
      address,
    } = response;
    if (!kWh || !recWeight) {
      // eslint-disable-next-line no-restricted-globals
      const confirmResult = confirm(
        "내발전소 정보가 없습니다. 등록하시겠습니까?"
      );
      if (confirmResult) {
        return navigate("/myInfo");
      } else {
        return alert(
          "정확한 계산을 위하여 내 발전소 정보가 없으면 이용하실 수 없습니다."
        );
      }
    }
    dispatch(sppActions.setSolar(this.dataOrderBy(solar)));
    dispatch(sppActions.setSRec(this.dataOrderBy(sRec)));
    dispatch(sppActions.setExpense(this.dataOrderBy(expense)));
    dispatch(sppActions.setFilteredExpense(this.dataOrderBy(fixedExpense)));
    dispatch(sppActions.setMyInfo({ kWh, recWeight, businessNumber, address }));
  }

  // 데이터 순서 정렬
  static dataOrderBy(data: any) {
    return data.sort((a: any, b: any) => {
      if (a.year !== b.year) return a.year - b.year;
      if (a.month !== b.month) return a.month - b.month;
      return (a.day ?? 0) - (b.day ?? 0);
    });
  }

  // 년도 필터링
  static filteringYears({ solar, sRec }: IFilteringYears): number[] {
    const spp = [...solar, ...sRec];
    const years = [...new Set(spp.map((item) => item.year))].sort(
      (a, b) => b - a
    );
    return years;
  }

  // 선택년도로 데이터 필터링
  static filteringData(selectedYear: number | null, data: any) {
    if (!selectedYear) return data;
    return data?.filter((data: any) => data.year === selectedYear);
  }

  // iRec 데이터 생성
  static createIRec(
    solar: ISolarFromBack[],
    myInfo: IMyInfo,
    dispatch: AppDispatch
  ) {
    const { kWh, recWeight } = myInfo;
    let remain = 0;

    const iRec: IIRec[] = solar.map((item: ISolarFromBack) => {
      const { year, month, createdAt, generation } = item;
      const generationInKwh = (generation / 1000) * Number(recWeight)!;

      remain += generationInKwh % 1;

      let issuance;
      let fee;

      if (remain > 1) {
        issuance = Math.floor(generationInKwh) + 1;
        remain -= 1;
      } else {
        issuance = Math.floor(generationInKwh);
      }

      fee = issuance * (kWh! < 100 ? 0 : 55);

      return {
        year,
        month,
        issuance,
        fee,
        remain,
        createdAt,
      };
    });
    dispatch(sppActions.setIRec(iRec));
  }

  // 데이터 추가 함수
  static async addDataToBack(
    apiCall: () => Promise<any>,
    dispatch: AppDispatch,
    setAction: any
  ): Promise<boolean> {
    const response = await apiCall();
    if (response?.status && response?.data) {
      dispatch(setAction(response.data));
      return true;
    }
    return false;
  }

  // 태양광 데이터 추가
  static async addSolar(solarInput: ISolarInput, dispatch: AppDispatch) {
    return await this.addDataToBack(
      () => sppApiService.addSolar(solarInput),
      dispatch,
      sppActions.setSolar
    );
  }

  // sRec 데이터 추가
  static async addSRec(sRecInput: ISRecInput, dispatch: AppDispatch) {
    return await this.addDataToBack(
      () => sppApiService.addSRec(sRecInput),
      dispatch,
      sppActions.setSRec
    );
  }

  // expense 데이터 추가
  static async addExpense(expenseInput: IExpenseInput, dispatch: AppDispatch) {
    return await this.addDataToBack(
      () => sppApiService.addExpense(expenseInput),
      dispatch,
      sppActions.setExpense
    );
  }

  // fixedExpense 데이터 추가
  static async addFixedExpense(
    fixedExpenseInput: IFixedExpenseInput,
    dispatch: AppDispatch
  ) {
    return await this.addDataToBack(
      () => sppApiService.addFixedExpense(fixedExpenseInput),
      dispatch,
      sppActions.setFixedExpense
    );
  }

  // 삭제 확인 alert
  static confirmDelete({ name, year, month, day }: IConfirmDelete) {
    // eslint-disable-next-line no-restricted-globals
    return confirm(
      `${year}년 ${month}월 ${
        day ? `${day}일` : ""
      } ${name} 데이터를 삭제 하시겠습니까?`
    );
  }

  // 태양광 데이터 한 개 삭제
  static async deleteOneSolar(
    deleteOneSolar: IDeleteOneSolar,
    dispatch: AppDispatch
  ) {
    const confirmResult = this.confirmDelete({
      name: "태양광",
      ...deleteOneSolar,
    });
    if (confirmResult) {
      const response = await sppApiService.deleteSolar({
        solarNumber: deleteOneSolar.solarNumber,
      });
      if (response?.status && response?.data) {
        dispatch(sppActions.setSolar(response?.data));
      }
    }
  }

  // sRec 데이터 한 개 삭제
  static async deleteOneSRec(
    deleteOneSRec: IDeleteOneSRec,
    dispatch: AppDispatch
  ) {
    const confirmResult = this.confirmDelete({
      name: "REC 판매",
      ...deleteOneSRec,
    });
    if (confirmResult) {
      const response = await sppApiService.deleteSRec({
        sRecNumber: deleteOneSRec.sRecNumber,
      });
      if (response?.status && response?.data) {
        dispatch(sppActions.setSRec(response?.data));
      }
    }
  }

  // 평균 데이터 반환 함수
  static getAvers(sums: any, sumCount: number): any {
    return Object.entries(sums).reduce((acc, [key, value]) => {
      acc[key] = Math.floor((value as any) / sumCount) || 0;
      return acc;
    }, {} as any);
  }

  // total 리턴 데이터
  static makeTotalReturn(sums: any, sumCount: number) {
    const avers = this.getAvers(sums, sumCount);
    return [
      { name: "평균", ...avers },
      { name: "총합", ...sums },
    ];
  }

  // 태양광 데이터 평균, 총합
  static solarTotal(solar: ISolarFromBack[]): ISolarTotal[] {
    let sums = {
      generation: 0,
      smp: 0,
      calcul: 0,
      supplyPrice: 0,
      vat: 0,
      total: 0,
    };

    solar?.forEach((item: ISolarFromBack) => {
      sums.generation += item.generation;
      sums.smp += Number(item.smp);
      sums.calcul += Math.floor(item.generation * Number(item.smp));
      sums.supplyPrice += item.supplyPrice;
      sums.vat += Math.floor(item.supplyPrice / 10);
      sums.total += item.supplyPrice + Math.floor(item.supplyPrice / 10);
    });

    const sumCount = solar.length;
    return this.makeTotalReturn(sums, sumCount);
  }

  // iRec 데이터 평균, 총합
  static iRecTotal(iRec: IIRec[]): IIRecTotal[] {
    let sums = {
      issuance: 0,
      fee: 0,
      remain: 0,
    };

    iRec?.forEach((item: IIRec) => {
      sums.issuance += item.issuance;
      sums.fee += item.fee;
      sums.remain += item.remain;
    });

    const sumCount = iRec.length;
    return this.makeTotalReturn(sums, sumCount);
  }

  // sRec 데이터 평균, 총합
  static sRecTotal(sRec: ISRecFromBack[]): ISRecTotal[] {
    let sums = {
      sVolume: 0,
      sPrice: 0,
      calcul: 0,
      vat: 0,
      total: 0,
    };

    sRec?.forEach((item: ISRecFromBack) => {
      const calcul = Math.floor(item.sVolume * item.sPrice);
      const vat = Math.floor(calcul / 10);
      sums.sVolume += item.sVolume;
      sums.sPrice += item.sPrice;
      sums.calcul += calcul;
      sums.vat += vat;
      sums.total += calcul + vat;
    });

    const sumCount = sRec.length;
    return this.makeTotalReturn(sums, sumCount);
  }
}
