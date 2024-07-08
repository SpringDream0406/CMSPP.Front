import { RefObject } from "react";
import {
  ISRecDataFromBack,
  ISolarDataFromBack,
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

export interface ISolarTotal {
  name: string;
  generation: number;
  smp: number;
  calcul: number;
  supplyPrice: number;
  vat: number;
  total: number;
}

export interface IIRecTotal extends Omit<IIRecData, "createdAt"> {
  name: string;
}

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

export interface IKWhAndrecWeightData
  extends Pick<ISppData, "kWh" | "recWeight"> {}
