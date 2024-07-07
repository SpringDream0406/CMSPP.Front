import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  IRecDataFromBack,
  ISolarDataFromBack,
} from "../interfaces/api.interface";

interface IReducerState {
  solarData: ISolarDataFromBack[];
  filteredSolarData: ISolarDataFromBack[];
  recData: IRecDataFromBack[];
  filteredRecData: IRecDataFromBack[];
}

const initialState: IReducerState = {
  solarData: [],
  filteredSolarData: [],
  recData: [],
  filteredRecData: [],
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
    setRecData(state, action: PayloadAction<IRecDataFromBack[]>) {
      state.recData = action.payload;
    },
    setFilteredRecData(state, action: PayloadAction<IRecDataFromBack[]>) {
      state.filteredRecData = action.payload;
    },
  },
});

export const sppActions = sppSlice.actions;
export default sppSlice.reducer;
