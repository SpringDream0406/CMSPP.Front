import axios, { AxiosError, isAxiosError } from "axios";
import { Utils } from "../utils";

// 무한 루프 걸려서 제한 걸어야하는데 코드가 더 길어져서 안쓰는게 나은듯..

// 엑세스토큰 포함된 통신, 401로 막히면 자동으로 엑세스토큰 발급받음
export const backAxios = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL,
  timeout: 5000,
});

backAxios.interceptors.request.use(
  (config) => {
    const accessToken = Utils.getAccessTokenFromLocalStorage();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${Utils.getAccessTokenFromLocalStorage()}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

backAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      try {
        await getAccessToken();
        error.config!.headers.Authorization = `Bearer ${Utils.getAccessTokenFromLocalStorage()}`;
        return backAxios.request(error.config!);
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
);

// 엑세스 토큰 발급
export const getAccessToken = async (): Promise<void> => {
  const url = "/getAccessToken";
  const data = "";
  const config = {
    withCredentials: true,
  };

  try {
    const response = await backAxios.post(url, data, config);
    console.log(response);

    Utils.setAccessTokenToLocalStorage(response.data);
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      alert("로그인이 만료 되었습니다. 다시 로그인 해주세요.");
      Utils.logOut();
      return;
    }
    console.error(error);
  }
};
