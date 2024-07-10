import { RefObject } from "react";
import {
  ISRecDataFromBack,
  ISolarDataFromBack,
  ISolarInputData,
  ISppData,
} from "./api.interface";

export interface ISendDataRefInputs {
  ref: RefObject<HTMLInputElement>;
  name: string;
}

export interface IIRecData {
  year: number;
  month: number;
  issuance: number;
  fee: number;
  remain: number;
  createdAt: string;
}

export interface ISolarTotal extends Omit<ISolarInputData, "yearAndMonth"> {
  name: string;
  calcul: number;
  vat: number;
  total: number;
}

export interface IIRecTotal
  extends Omit<IIRecData, "year" | "month" | "createdAt"> {
  name: string;
}

export interface IFilteringYears
  extends Pick<ISppData, "solarData" | "sRecData"> {}

export interface IConfirmDelete {
  dataName: string;
  year: number;
  month: number;
  day?: number;
}

export interface IDeleteOneSolarData
  extends Pick<ISolarDataFromBack, "solarNumber" | "year" | "month"> {}

export interface IDeleteOneSRecData
  extends Pick<ISRecDataFromBack, "sRecNumber" | "year" | "month" | "day"> {}
