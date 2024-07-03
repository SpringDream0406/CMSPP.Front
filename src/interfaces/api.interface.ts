export interface ISolarData {
  yearAndMonth: string;
  generation: number;
  smp: number;
  supplyPrice: number;
}

export interface ISolarDataFromBack extends Omit<ISolarData, "yearAndMonth"> {
  year: number;
  month: number;
  userUid: string;
  createdAt: string;
}

export interface IRecData {
  yearAndMonth: string;
  fee: number;
  issusRec: number;
  salsesVolume: number;
  salsesPrice: number;
}

export interface IRecDataFromBack extends Omit<IRecData, "yearAndMonth"> {
  year: number;
  month: number;
  userUid: string;
  createdAt: string;
}

export interface ISppData {
  solar: ISolarDataFromBack[];
  rec: IRecDataFromBack[];
}

export interface IDeleteOneSolarData
  extends Pick<ISolarDataFromBack, "year" | "month"> {}
