import { RefObject } from "react";
import {
  ISRecFromBack,
  ISRecInput,
  ISolarFromBack,
  ISolarInput,
  ISpp,
} from "./api.interface";

export interface ISendDataRefInputs {
  ref: RefObject<HTMLInputElement>;
  name: string;
}

export interface IIRec {
  year: number;
  month: number;
  issuance: number;
  fee: number;
  remain: number;
  createdAt: string;
}

export interface ISolarTotal extends Omit<ISolarInput, "yearAndMonth"> {
  name: string;
  calcul: number;
  vat: number;
  total: number;
}

export interface IIRecTotal
  extends Omit<IIRec, "year" | "month" | "createdAt"> {
  name: string;
}

export interface ISRecTotal extends Omit<ISRecInput, "date"> {
  name: string;
  calcul: number;
  vat: number;
  total: number;
}

export interface IFilteringYears extends Pick<ISpp, "solar" | "sRec"> {}

export interface IConfirmDelete {
  name: string;
  year: number;
  month: number;
  day?: number;
}

export interface IDeleteOneSolar
  extends Pick<ISolarFromBack, "solarNumber" | "year" | "month"> {}

export interface IDeleteOneSRec
  extends Pick<ISRecFromBack, "sRecNumber" | "year" | "month" | "day"> {}
