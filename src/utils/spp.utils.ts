import { NavigateFunction } from "react-router-dom";
import {
  IExpenseFromBack,
  IExpenseInput,
  IFixedExpenseFromBack,
  IFixedExpenseInput,
  IMyInfo,
  ISRecFromBack,
  ISRecInput,
  ISolar,
  ISolarFromBack,
  ISolarInput,
  ISpp,
} from "../interfaces/api.interface";
import {
  IConfirmDelete,
  IDeleteOneExpense,
  IDeleteOneFixedExpense,
  IDeleteOneSRec,
  IDeleteOneSolar,
  IExpenseTotal,
  IFilteringYears,
  IIRec,
  IIRecTotal,
  ISRecTotal,
  ISolarTotal,
} from "../interfaces/utils.interface";
import { sppActions } from "../redux/sppReducer";
import { AppDispatch } from "../redux/store";
import { SppApiService } from "./services/sppApi.service";
import { RefObject } from "react";
import { Utils } from "./utils";

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
    dispatch(sppActions.setSolar(this.dataOrderBy(this.createSolar(solar))));
    dispatch(sppActions.setSRec(this.dataOrderBy(sRec)));
    dispatch(sppActions.setExpense(this.dataOrderBy(expense)));
    dispatch(sppActions.setFixedExpense(this.dataOrderBy(fixedExpense)));
    dispatch(sppActions.setMyInfo({ kWh, recWeight, businessNumber, address }));
  }

  // 데이터 순서 정렬
  static dataOrderBy(data: any) {
    return data.sort((a: any, b: any) => {
      return a.date.localeCompare(b.date);
    });
  }

  // 년도 필터링
  static filteringYears({ solar, sRec, expense }: IFilteringYears): number[] {
    const spp = [...solar, ...sRec, ...expense];
    const years = [
      ...new Set(spp.map((item) => Utils.getYear(item.date))),
    ].sort((a, b) => b - a);
    return years;
  }

  // 선택년도로 데이터 필터링
  static filteringData(selectedYear: number | null, data: any) {
    if (!selectedYear) return data;
    return data?.filter(
      (item: any) => Utils.getYear(item.date) === selectedYear
    );
  }

  // 고정지출 선택 년도 데이터 필터링
  static filteringFixedExpenseData(
    selectedYear: number | null,
    fixedExpense: IFixedExpenseFromBack[]
  ) {
    if (!selectedYear) return fixedExpense;
    return fixedExpense?.filter(
      (data: IFixedExpenseFromBack) =>
        Utils.getYear(data.startDate) <= selectedYear &&
        selectedYear <= Utils.getYear(data.endDate)
    );
  }

  // 계산을 위한 solar 데이터 생성
  static createSolar(solarFromBack: ISolarFromBack[]): ISolar[] {
    return solarFromBack.map((item: ISolarFromBack) => {
      let [year, month] = Utils.splitDate(item.date);
      month += 1;
      if (month > 12) {
        month = 1;
        year += 1;
      }
      const taxDate = `${year}-${String(month).padStart(2, "0")}`;
      return { ...item, generationDate: item.date, date: taxDate };
    });
  }

  // iRec 데이터 생성
  static createIRec(solar: ISolar[], myInfo: IMyInfo, dispatch: AppDispatch) {
    const { kWh, recWeight } = myInfo;
    let remain = 0;

    const iRec: IIRec[] = solar.map((item: ISolar) => {
      const { date, createdAt, generation } = item;
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
        date,
        issuance,
        fee,
        remain,
        createdAt,
      };
    });
    dispatch(sppActions.setIRec(iRec));
  }

  // input 데이터 처리
  static async sendData(
    inputs: { ref: RefObject<HTMLInputElement>; name: string }[],
    dataExtractor: (values: string[]) => any,
    addFunction: (data: any, dispatch: AppDispatch) => Promise<boolean>,
    dispatch: AppDispatch
  ) {
    // 빈값 체크
    const isNotNull = Utils.sendDataCheckIsNotNull(inputs);
    if (!isNotNull) return;

    // 입력 값을 배열로 추출
    const values = inputs.map((input) => input.ref.current!.value);

    // 데이터 추출
    const data = dataExtractor(values);

    // 서버로 데이터 전송
    const isAdded = await addFunction(data, dispatch);
    if (isAdded) Utils.clearInputs(inputs);
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

  // solar 데이터 추가
  static async addSolar(
    solarInput: ISolarInput,
    dispatch: AppDispatch
  ): Promise<boolean> {
    const response = await sppApiService.addSolar(solarInput);
    if (response?.status && response?.data) {
      dispatch(sppActions.setSolar(SppUtils.createSolar(response.data)));
      return true;
    }
    return false;
  }

  // sRec 데이터 추가
  static async addSRec(sRecInput: ISRecInput, dispatch: AppDispatch) {
    return await SppUtils.addDataToBack(
      () => sppApiService.addSRec(sRecInput),
      dispatch,
      sppActions.setSRec
    );
  }

  // expense 데이터 추가
  static async addExpense(expenseInput: IExpenseInput, dispatch: AppDispatch) {
    return await SppUtils.addDataToBack(
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
    if (fixedExpenseInput.startDate > fixedExpenseInput.endDate) {
      alert("기간의 시작이 종료 보다 큽니다.");
      return false;
    }
    return await SppUtils.addDataToBack(
      () => sppApiService.addFixedExpense(fixedExpenseInput),
      dispatch,
      sppActions.setFixedExpense
    );
  }

  // 삭제 확인 alert
  static confirmDelete({ name, date }: IConfirmDelete) {
    // eslint-disable-next-line no-restricted-globals
    return confirm(`${date} ${name} 데이터를 삭제 하시겠습니까?`);
  }

  // solar 데이터 한 개 삭제
  static async deleteOneSolar(
    deleteOneSolar: IDeleteOneSolar,
    dispatch: AppDispatch
  ) {
    const confirmResult = this.confirmDelete({
      name: "태양광",
      date: deleteOneSolar.generationDate,
    });
    if (confirmResult) {
      const response = await sppApiService.deleteSolar(
        deleteOneSolar.solarNumber
      );
      if (response?.status && response?.data) {
        dispatch(sppActions.setSolar(SppUtils.createSolar(response?.data)));
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
      const response = await sppApiService.deleteSRec(deleteOneSRec.sRecNumber);
      if (response?.status && response?.data) {
        dispatch(sppActions.setSRec(response?.data));
      }
    }
  }

  // expense 데이터 한 개 삭제
  static async deleteOneExpense(
    deleteOneExpense: IDeleteOneExpense,
    dispatch: AppDispatch
  ) {
    const confirmResult = this.confirmDelete({
      name: "지출",
      ...deleteOneExpense,
    });
    if (confirmResult) {
      const response = await sppApiService.deleteExpense(
        deleteOneExpense.eNumber
      );
      if (response?.status && response?.data) {
        dispatch(sppActions.setExpense(response?.data));
      }
    }
  }

  // fixedExpense 데이터 한 개 삭제
  static async deleteOneFixedExpense(
    deleteOneFixedExpense: IDeleteOneFixedExpense,
    dispatch: AppDispatch
  ) {
    // eslint-disable-next-line no-restricted-globals
    const confirmResult = confirm(
      `${deleteOneFixedExpense.feName} ${deleteOneFixedExpense.fePrice}원, 고정 지출 데이터를 삭제하겠습니까?`
    );
    if (confirmResult) {
      const response = await sppApiService.deleteFixedExpense(
        deleteOneFixedExpense.feNumber
      );
      if (response?.status && response?.data) {
        dispatch(sppActions.setFixedExpense(response?.data));
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

  // 지출들 평균, 총합 구하는 함수
  static calculExToal<T>(
    data: T[],
    valueExtractor: (item: T) => number
  ): IExpenseTotal[] {
    let sums = { total: 0 };
    data?.forEach((item: T) => {
      sums.total += valueExtractor(item);
    });
    const sumCount = data.length;
    return this.makeTotalReturn(sums, sumCount);
  }

  // expense 데이터 평균, 총합
  static expenseTotal(expense: IExpenseFromBack[]): IExpenseTotal[] {
    return this.calculExToal(expense, (item) => Number(item.ePrice));
  }

  // fixedExpense 데이터 평균, 총합
  static fixedExpenseTotal(
    fixedExpense: IFixedExpenseFromBack[]
  ): IExpenseTotal[] {
    return this.calculExToal(fixedExpense, (item) => Number(item.fePrice));
  }

  // 분기별 데이터 누적을 위한 함수
  static taxCal1(
    sales: number,
    purchases: number,
    vat: number,
    month: number,
    sums: { sales: any; purchases: any; vat: any }
  ) {
    const quarter = Math.ceil(month / 3);
    sums.sales[`q${quarter}`] += sales;
    sums.purchases[`q${quarter}`] += purchases;
    sums.vat[`q${quarter}`] += vat;
  }

  // 분기별 매출, 매입, 부가가치세
  static taxCalCul(
    solar: ISolarFromBack[],
    sRec: ISRecFromBack[],
    expense: IExpenseFromBack[],
    fixedExpense: IFixedExpenseFromBack[]
  ) {
    let sums = {
      sales: { q1: 0, q2: 0, q3: 0, q4: 0 },
      purchases: { q1: 0, q2: 0, q3: 0, q4: 0 },
      vat: { q1: 0, q2: 0, q3: 0, q4: 0 },
    };

    solar?.forEach((item: ISolarFromBack) => {
      const supplyPrice = item.supplyPrice;
      const vat = Math.floor(supplyPrice / 10);
      this.taxCal1(supplyPrice + vat, 0, vat, Utils.getMonth(item.date), sums);
    });

    sRec?.forEach((item: ISRecFromBack) => {
      const total = Math.floor(item.sVolume * item.sPrice);
      const vat = total / 10;
      this.taxCal1(total + vat, 0, vat, Utils.getMonth(item.date), sums);
    });

    expense?.forEach((item: IExpenseFromBack) => {
      const price = Math.floor(item.ePrice);
      const vat = price / 10;
      this.taxCal1(0, price, -vat, Utils.getMonth(item.date), sums);
    });

    fixedExpense?.forEach((item: IFixedExpenseFromBack) => {
      const price = item.fePrice * 3;
      const vat = price / 10;
      sums.purchases.q1 += price;
      sums.purchases.q2 += price;
      sums.purchases.q3 += price;
      sums.purchases.q4 += price;
      sums.vat.q1 -= vat;
      sums.vat.q2 -= vat;
      sums.vat.q3 -= vat;
      sums.vat.q4 -= vat;
    });

    return sums;
  }
}
