import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IReducerState {
  accessToken: string;
}

const initialState: IReducerState = {
  accessToken: "",
};

const reducerSlice = createSlice({
  name: "reducer",
  initialState: initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
  },
});

export const reducerActions = reducerSlice.actions;
export default reducerSlice.reducer;
