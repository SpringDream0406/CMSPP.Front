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

export interface ISppData {
  solar: ISolarDataFromBack[];
}

export interface IDeleteOneSolarData
  extends Pick<ISolarDataFromBack, "year" | "month"> {}
