import axios, { AxiosRequestConfig } from "axios";

interface IAxiosPost {
  url: string;
  data?: any;
  config?: AxiosRequestConfig;
}

interface IAxiosPostWithAccessToken extends Omit<IAxiosPost, "config"> {
  accessToken: string;
}

export class ApiUtils {
  // 기본 post 통신
  async axiosPost({ url, data, config }: IAxiosPost) {
    try {
      const response = await axios.post(url, data, config);
      return response.data;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  // 엑세스토큰 받아오는 통신
  async getAccessToken() {
    const url = process.env.REACT_APP_URL_GETACCESSTOKEN!;
    const config = {
      withCredentials: true, // 쿠키 포함해서 보내기
    };
    return await this.axiosPost({ url, config });
  }

  // 엑세스토큰 헤더에 담은 통신
  async axiosPostWithAccessToken({
    url,
    accessToken,
    data,
  }: IAxiosPostWithAccessToken) {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json", // 필요에 따라 다른 헤더도 추가 가능
      },
    };
    return await this.axiosPost({ url, data, config });
  }

  // 회원 탈퇴 통신
  async withdrawal(accessToken: string) {
    const url = process.env.REACT_APP_SOCIAL_WITHDRAWAL!;
    return await this.axiosPostWithAccessToken({ url, accessToken });
  }
}
