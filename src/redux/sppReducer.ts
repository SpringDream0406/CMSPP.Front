import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
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
}

const initialState: IReducerState = {
  solarData: [],
  filteredSolarData: [],
  filteredIRecData: [],
  sRecData: [],
  filteredSRecData: [],
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
  },
});

export const sppActions = sppSlice.actions;
export default sppSlice.reducer;
