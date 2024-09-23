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

export interface ISolarFromBack extends ISolarInput {
  solarNumber: number;
  createdAt: string;
}

export interface ISolar extends ISolarFromBack {
  generationDate: string;
}

export interface ISRecInput {
  date: string;
  sVolume: number;
  sPrice: number;
}

export interface ISRecFromBack extends ISRecInput {
  sRecNumber: number;
  createdAt: string;
}

export interface IExpenseInput {
  date: string;
  eName: string;
  ePrice: number;
}

export interface IExpenseFromBack extends IExpenseInput {
  eNumber: number;
  createdAt: string;
}

export interface IFixedExpenseInput {
  startDate: string;
  endDate: string;
  feName: string;
  fePrice: number;
}

export interface IFixedExpenseFromBack extends IFixedExpenseInput {
  feNumber: number;
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
