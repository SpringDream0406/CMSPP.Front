import { IDeleteOneSRecData, IDeleteOneSolarData } from "./utils.interface";

export interface ISolarInputData {
  yearAndMonth: string;
  generation: number;
  smp: number;
  supplyPrice: number;
}

export interface ISolarDataFromBack
  extends Omit<ISolarInputData, "yearAndMonth"> {
  solarNumber: number;
  year: number;
  month: number;
  userUid: string;
  createdAt: string;
}

export interface ISRecInputData {
  date: string;
  sVolume: number;
  sPrice: number;
}

export interface ISRecDataFromBack extends Omit<ISRecInputData, "date"> {
  sRecNumber: number;
  year: number;
  month: number;
  day: number;
  userUid: string;
  createdAt: string;
}

export interface IMyInfoData {
  kWh: number | null;
  recWeight: number | null;
  businessNumber: number | null;
  address1: string;
  address2: string;
}

export interface ISppData {
  solarData: ISolarDataFromBack[];
  sRecData: ISRecDataFromBack[];
  kWh: number;
  recWeight: number;
}

export interface ISppApiServiceDeleteOneSolarData
  extends Pick<IDeleteOneSolarData, "solarNumber"> {}

export interface ISppApiServiceDeleteOneSRecData
  extends Pick<IDeleteOneSRecData, "sRecNumber"> {}
