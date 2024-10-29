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

interface BaseSpp {
  id: number;
  createdAt: string;
}

export interface ISolarInput {
  date: string;
  generation: number;
  smp: number;
  supplyPrice: number;
}
export type ISolarFromBack = BaseSpp & ISolarInput;
export interface ISolar extends ISolarFromBack {
  generationDate: string;
}

export interface ISRecInput {
  date: string;
  sVolume: number;
  sPrice: number;
}
export type ISRecFromBack = BaseSpp & ISRecInput;

export interface IExpenseInput {
  date: string;
  eName: string;
  ePrice: number;
}
export type IExpenseFromBack = BaseSpp & IExpenseInput;

export interface IFixedExpenseInput {
  startDate: string;
  endDate: string;
  feName: string;
  fePrice: number;
}
export type IFixedExpenseFromBack = BaseSpp & IFixedExpenseInput;

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
