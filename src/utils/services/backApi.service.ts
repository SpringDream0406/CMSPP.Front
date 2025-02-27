import axios, { AxiosResponse, isAxiosError } from "axios";
import { UserUtils } from "../user.utils";
import {
  IAxiosBack,
  IAxiosPost,
  IBackWithAccessToken,
} from "../../interfaces/api.interface";

export class BackApiService {
  //
  // 기본 post 통신
  async axiosPost({
    url,
    data,
    config,
  }: IAxiosPost): Promise<AxiosResponse<any>> {
    try {
      const response = await axios.post(url, data, config);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // 백엔드와 통신 기본 설정
  backAxios = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL,
    timeout: 5000,
  });

  // 백엔드와 통신 함수
  async axiosBack({
    method,
    url,
    config,
    data,
  }: IAxiosBack): Promise<AxiosResponse<any>> {
    try {
      if (method === "get" || method === "delete") {
        return await this.backAxios[method](url, config);
      }
      const response = await this.backAxios[method](url, data, config);
      // console.log(response);

      return response;
    } catch (error) {
      throw error;
    }
  }

  // 백엔드와 토큰 포함 통신 함수
  async backWithAccessToken({
    method,
    url,
    data,
  }: IBackWithAccessToken): Promise<AxiosResponse<any>> {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${UserUtils.getAccessTokenFromLocalStorage()}`,
      },
    };
    try {
      return await this.axiosBack({ method, url, config, data });
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        try {
          await this.getAccessToken();
          config.headers.Authorization = `Bearer ${UserUtils.getAccessTokenFromLocalStorage()}`;
          return await this.axiosBack({ method, url, config, data });
        } catch (error) {
          throw error;
        }
      }
      throw error;
    }
  }

  // 엑세스토큰 받아오는 통신
  async getAccessToken(): Promise<void> {
    const url = `${process.env.REACT_APP_BACK_AUTH}/getAccessToken`;
    const config = {
      withCredentials: true, // 쿠키 포함해서 보내기
    };
    try {
      const response = await this.axiosBack({ method: "get", url, config });
      UserUtils.setAccessTokenToLocalStorage(response.data);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        alert("로그인이 만료 되었습니다. 다시 로그인 해주세요.");
        UserUtils.logOut();
        return;
      }
      console.error(error);
    }
  }

  // data 포털의 사업자 등록정보 상태 조회 서비스
  // 사업자 등록 정보 체크
  async checkBusinessNumber(businessNumber: number) {
    try {
      const response = await this.axiosPost({
        url: `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${process.env.REACT_APP_DATAGOKR_ENCODING_KEY}`,
        data: { b_no: [String(businessNumber)] },
      });
      return response;
    } catch (error) {
      console.error(error);
      alert("사업자 등록 정보를 조회하는데 실패했습니다.");
    }
  }
}
