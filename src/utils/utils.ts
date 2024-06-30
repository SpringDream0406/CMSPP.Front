import Cookies from "js-cookie";
import { ISolarDataFromBack } from "./interfaces/api.interface";

export class Utils {
  // 로컬스토리지에 엑세스토큰 있나 체크
  static checkAccessTokenFromLocalStorage(): boolean {
    const accessToken = this.getAccessTokenFromLocalStorage();
    return !!accessToken;
  }

  // 로컬스토리지에서 엑세스토큰 가져오기
  static getAccessTokenFromLocalStorage(): string | null {
    return localStorage.getItem("accessToken");
  }

  // 로컬스토리지에 엑세스토큰 저장하기
  static setAccessTokenToLocalStorage(accessToken: string): void {
    localStorage.setItem("accessToken", accessToken);
  }

  // 로컬스토리지의 엑세스토큰 삭제하기
  static removeAccessTokenFromLocalStorage(): void {
    localStorage.removeItem("accessToken");
  }

  // 리프레시토큰 쿠키 있나 체크
  static checkRefreshToken(): string | undefined {
    return Cookies.get("refreshToken");
  }

  // 리프레시토큰 삭제
  static removeRefreshToken(): void {
    Cookies.remove("refreshToken");
  }

  // 로그아웃 처리
  static logOut(): void {
    this.removeRefreshToken();
    this.removeAccessTokenFromLocalStorage();
    window.location.href = "/";
  }

  // 선택 년도들
  static selectYears(data: any) {
    const selectYears = data?.map((data: any) => data.year) ?? [];
    const uniqueYears = Array.from(new Set(selectYears)).map((year) =>
      String(year)
    );
    const selectYearsReversed = [...uniqueYears].reverse();
    const selectYearsWithTotal = [...selectYearsReversed, "전체"];
    // console.log(selectYearsWithTotal);
    return selectYearsWithTotal;
  }

  // 년도 데이터 필터링
  static filteringData(selectedYear: number, data: any) {
    if (!selectedYear) return data;
    return data.filter((data: any) => data.year === selectedYear);
  }

  // 태양광 데이터 총합
  static solarTotal(data?: any) {
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
      generation: Math.floor(sums.generation / sumCount),
      smp: Math.floor(sums.smp / sumCount),
      calcul: Math.floor(sums.calcul / sumCount),
      supplyPrice: Math.floor(sums.supplyPrice / sumCount),
      vat: Math.floor(sums.vat / sumCount),
      total: Math.floor(sums.total / sumCount),
      count: sums.count,
    };

    const returnData = [
      { name: "평균", ...avers },
      { name: "총합", ...sums },
    ];
    return returnData;
  }
}

interface ISolarTotal {
  name: string;
  generation: number;
  smp: number;
  calcul: number;
  supplyPrice: number;
  vat: number;
  total: number;
  count: number;
}
