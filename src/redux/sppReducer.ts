import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  IExpenseFromBack,
  IFixedExpenseFromBack,
  IMyInfo,
  ISRecFromBack,
  ISolarFromBack,
} from "../interfaces/api.interface";
import { IIRec } from "../interfaces/utils.interface";

interface IReducerState {
  solar: ISolarFromBack[];
  filteredSolar: ISolarFromBack[];
  iRec: IIRec[];
  filteredIRec: IIRec[];
  sRec: ISRecFromBack[];
  filteredSRec: ISRecFromBack[];
  expense: IExpenseFromBack[];
  filteredExpense: IExpenseFromBack[];
  fixedExpense: IFixedExpenseFromBack[];
  myInfo: IMyInfo;
}

const initialState: IReducerState = {
  solar: [],
  filteredSolar: [],
  iRec: [],
  filteredIRec: [],
  sRec: [],
  filteredSRec: [],
  expense: [],
  filteredExpense: [],
  fixedExpense: [],
  myInfo: {
    kWh: null,
    recWeight: null,
    businessNumber: null,
    address: "",
  },
};

const sppSlice = createSlice({
  name: "reducer",
  initialState: initialState,
  reducers: {
    setSolar(state, action: PayloadAction<ISolarFromBack[]>) {
      state.solar = action.payload;
    },
    setFilteredSolar(state, action: PayloadAction<ISolarFromBack[]>) {
      state.filteredSolar = action.payload;
    },
    setIRec(state, action: PayloadAction<IIRec[]>) {
      state.iRec = action.payload;
    },
    setFilteredIRec(state, action: PayloadAction<IIRec[]>) {
      state.filteredIRec = action.payload;
    },
    setSRec(state, action: PayloadAction<ISRecFromBack[]>) {
      state.sRec = action.payload;
    },
    setFilteredSRec(state, action: PayloadAction<ISRecFromBack[]>) {
      state.filteredSRec = action.payload;
    },
    setExpense(state, action: PayloadAction<IExpenseFromBack[]>) {
      state.expense = action.payload;
    },
    setFilteredExpense(state, action: PayloadAction<IExpenseFromBack[]>) {
      state.filteredExpense = action.payload;
    },
    setFixedExpense(state, action: PayloadAction<IFixedExpenseFromBack[]>) {
      state.fixedExpense = action.payload;
    },
    setMyInfo(state, action: PayloadAction<IMyInfo>) {
      state.myInfo = action.payload;
    },
  },
});

export const sppActions = sppSlice.actions;
export default sppSlice.reducer;
