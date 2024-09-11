import { AxiosRequestConfig } from "axios";
export interface IAxiosPost {
  url: string;
  data?: any;
  config?: AxiosRequestConfig;
}

export interface IAxiosBack {
  method: "get" | "post" | "put" | "delete";
  url: string;
  config: AxiosRequestConfig;
  data?: any;
}

export interface IBackWithAccessToken extends Omit<IAxiosBack, "config"> {}

export interface ISolarInput {
  date: string;
  generation: number;
  smp: number;
  supplyPrice: number;
}

export interface ISolarFromBack extends Omit<ISolarInput, "date"> {
  solarNumber: number;
  year: number;
  month: number;
  createdAt: string;
}

export interface ISRecInput {
  date: string;
  sVolume: number;
  sPrice: number;
}

export interface ISRecFromBack extends Omit<ISRecInput, "date"> {
  sRecNumber: number;
  year: number;
  month: number;
  day: number;
  createdAt: string;
}

export interface IExpenseInput {
  date: string;
  eName: string;
  ePrice: number;
}

export interface IExpenseFromBack extends Omit<IExpenseInput, "date"> {
  eNumber: number;
  year: number;
  month: number;
  day: number;
  createdAt: string;
}

export interface IFixedExpenseInput {
  startDate: string;
  endDate: string;
  feName: string;
  fePrice: number;
}

export interface IFixedExpenseFromBack
  extends Pick<IFixedExpenseInput, "feName" | "fePrice"> {
  feNumber: number;
  startYear: number;
  startMonth: number;
  endYear: number;
  endMonth: number;
  createdAt: string;
}

export interface IMyInfo {
  kWh: number | null;
  recWeight: number | null;
  businessNumber: number | null;
  address: string;
}

export interface ISpp {
  solar: ISolarFromBack[];
  sRec: ISRecFromBack[];
  expense: IExpenseFromBack[];
  fixedExpense: IFixedExpenseFromBack[];
  kWh: number;
  recWeight: number;
  businessNumber: number;
  address: string;
}
