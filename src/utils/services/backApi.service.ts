import axios, { AxiosRequestConfig, AxiosResponse, isAxiosError } from "axios";
import { UserUtils } from "../user.utils";

interface IAxiosGet {
  url: string;
  config?: AxiosRequestConfig;
}

interface IAxiosGetWithAccessToken extends Omit<IAxiosGet, "config"> {}

interface IAxiosPost {
  url: string;
  data?: any;
  config?: AxiosRequestConfig;
}

interface IAxiosPostWithAccessToken extends Omit<IAxiosPost, "config"> {}

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

  // 백엔드와 get 통신
  async axiosBackGet({ url, config }: IAxiosGet): Promise<AxiosResponse<any>> {
    try {
      const response = await this.backAxios.get(url, config);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // 백엔드와 post 통신
  async axiosBackPost({
    url,
    data,
    config,
  }: IAxiosPost): Promise<AxiosResponse<any>> {
    try {
      const response = await this.backAxios.post(url, data, config);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // 엑세스토큰 받아오는 통신
  async getAccessToken(): Promise<void> {
    const url = "/getAccessToken";
    const config = {
      withCredentials: true, // 쿠키 포함해서 보내기
    };
    try {
      const response = await this.axiosBackPost({ url, config });
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

  // 엑세스토큰 헤더에 담은 get 통신
  async backGetWithAccessToken({
    url,
  }: IAxiosGetWithAccessToken): Promise<AxiosResponse<any>> {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${UserUtils.getAccessTokenFromLocalStorage()}`,
      },
    };
    try {
      const response = await this.axiosBackGet({ url, config });
      // console.log(response);
      return response;
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        try {
          await this.getAccessToken();
          config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${UserUtils.getAccessTokenFromLocalStorage()}`,
            },
          };
          const response = await this.axiosBackGet({ url, config });
          return response;
        } catch (error) {
          throw error;
        }
      }
      throw error;
    }
  }

  // 엑세스토큰 헤더에 담은 post 통신
  async backPostWithAccessToken({
    url,
    data,
  }: IAxiosPostWithAccessToken): Promise<AxiosResponse<any>> {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${UserUtils.getAccessTokenFromLocalStorage()}`,
      },
    };
    try {
      const response = await this.axiosBackPost({ url, data, config });
      // console.log(response);
      return response;
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        try {
          await this.getAccessToken();
          config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${UserUtils.getAccessTokenFromLocalStorage()}`,
            },
          };
          const response = await this.axiosBackPost({ url, data, config });
          return response;
        } catch (error) {
          throw error;
        }
      }
      throw error;
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
