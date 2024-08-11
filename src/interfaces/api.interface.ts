import { IDeleteOneSRec, IDeleteOneSolar } from "./utils.interface";

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

export interface ISppApiServiceDeleteOneSolar
  extends Pick<IDeleteOneSolar, "solarNumber"> {}

export interface ISppApiServiceDeleteOneSRec
  extends Pick<IDeleteOneSRec, "sRecNumber"> {}
