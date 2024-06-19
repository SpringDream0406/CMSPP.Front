import Cookies from "js-cookie";

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
  static logOut() {
    this.removeRefreshToken();
    this.removeAccessTokenFromLocalStorage();
    window.location.href = "/";
  }
}
