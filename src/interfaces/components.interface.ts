import { Dispatch, SetStateAction } from "react";
import { IRecDataFromBack, ISolarDataFromBack } from "./api.interface";

export type ISppDataFromBack =
  | ISolarDataFromBack[]
  | IRecDataFromBack[]
  | undefined;

export interface ISppTitle {
  name: string;
  data: ISppDataFromBack;
  setSeletedYear: Dispatch<SetStateAction<string | undefined>>;
}
