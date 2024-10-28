import { RefObject } from "react";
import {
  IExpenseFromBack,
  IFixedExpenseFromBack,
  ISRecFromBack,
  ISRecInput,
  ISolar,
  ISolarInput,
  ISpp,
} from "./api.interface";

export interface ISendDataRefInputs {
  ref: RefObject<HTMLInputElement>;
  name: string;
}

export interface IIRec {
  date: string;
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
  fee: number;
  total: number;
}

export interface IExpenseTotal {
  name: string;
  total: number;
}
export interface IFilteringYears
  extends Pick<ISpp, "solar" | "sRec" | "expense"> {}

export interface IConfirmDelete {
  name: string;
  date: string;
}

export interface IDeleteOneSolar
  extends Pick<ISolar, "solarNumber" | "generationDate"> {}

export interface IDeleteOneSRec
  extends Pick<ISRecFromBack, "sRecNumber" | "date"> {}

export interface IDeleteOneExpense
  extends Pick<IExpenseFromBack, "eNumber" | "date"> {}

export interface IDeleteOneFixedExpense
  extends Pick<IFixedExpenseFromBack, "feNumber" | "feName" | "fePrice"> {}
