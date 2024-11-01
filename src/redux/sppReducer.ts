import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  IExpenseFromBack,
  IFixedExpenseFromBack,
  IIRec,
  IMyInfo,
  ISRecFromBack,
  ISolar,
} from "../interfaces/api.interface";

interface IReducerState {
  solar: ISolar[];
  filteredSolar: ISolar[];
  iRec: IIRec[];
  filteredIRec: IIRec[];
  sRec: ISRecFromBack[];
  filteredSRec: ISRecFromBack[];
  expense: IExpenseFromBack[];
  filteredExpense: IExpenseFromBack[];
  fixedExpense: IFixedExpenseFromBack[];
  filteredFixedExpense: IFixedExpenseFromBack[];
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
  filteredFixedExpense: [],
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
    setSolar(state, action: PayloadAction<ISolar[]>) {
      state.solar = action.payload;
    },
    setFilteredSolar(state, action: PayloadAction<ISolar[]>) {
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
    setFilteredFixedExpense(
      state,
      action: PayloadAction<IFixedExpenseFromBack[]>
    ) {
      state.filteredFixedExpense = action.payload;
    },
    setMyInfo(state, action: PayloadAction<IMyInfo>) {
      state.myInfo = action.payload;
    },
  },
});

export const sppActions = sppSlice.actions;
export default sppSlice.reducer;
