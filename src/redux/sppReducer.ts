import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  IMyInfoData,
  ISRecDataFromBack,
  ISolarDataFromBack,
} from "../interfaces/api.interface";
import { IIRecData } from "../interfaces/utils.interface";

interface IReducerState {
  solarData: ISolarDataFromBack[];
  filteredSolarData: ISolarDataFromBack[];
  filteredIRecData: IIRecData[];
  sRecData: ISRecDataFromBack[];
  filteredSRecData: ISRecDataFromBack[];
  myInfoData: IMyInfoData;
}

const initialState: IReducerState = {
  solarData: [],
  filteredSolarData: [],
  filteredIRecData: [],
  sRecData: [],
  filteredSRecData: [],
  myInfoData: {
    kWh: null,
    recWeight: null,
    businessNumber: null,
    address1: "",
    address2: "",
  },
};

const sppSlice = createSlice({
  name: "reducer",
  initialState: initialState,
  reducers: {
    setSolarData(state, action: PayloadAction<ISolarDataFromBack[]>) {
      state.solarData = action.payload;
    },
    setFilteredSolarData(state, action: PayloadAction<ISolarDataFromBack[]>) {
      state.filteredSolarData = action.payload;
    },
    setFilteredIRecData(state, action: PayloadAction<IIRecData[]>) {
      state.filteredIRecData = action.payload;
    },
    setSRecData(state, action: PayloadAction<ISRecDataFromBack[]>) {
      state.sRecData = action.payload;
    },
    setFilteredSRecData(state, action: PayloadAction<ISRecDataFromBack[]>) {
      state.filteredSRecData = action.payload;
    },
    setMyInfoData(state, action: PayloadAction<IMyInfoData>) {
      state.myInfoData = action.payload;
    },
  },
});

export const sppActions = sppSlice.actions;
export default sppSlice.reducer;
