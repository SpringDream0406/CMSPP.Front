import axios, { AxiosRequestConfig, AxiosResponse, isAxiosError } from "axios";
import { Utils } from "./utils";

interface IAxiosPost {
  url: string;
  data?: any;
  config?: AxiosRequestConfig;
}

interface IAxiosPostWithAccessToken extends Omit<IAxiosPost, "config"> {}

export class BackApiService {
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
      Utils.setAccessTokenToLocalStorage(response.data);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        alert("로그인이 만료 되었습니다. 다시 로그인 해주세요.");
        Utils.logOut();
        return;
      }
      console.log(error);
    }
  }

  // 엑세스토큰 헤더에 담은 통신
  async backPostWithAccessToken({ url, data }: IAxiosPostWithAccessToken) {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Utils.getAccessTokenFromLocalStorage()}`,
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
              Authorization: `Bearer ${Utils.getAccessTokenFromLocalStorage()}`,
            },
          };
          const response = await this.axiosBackPost({ url, data, config });
          return response;
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
}
