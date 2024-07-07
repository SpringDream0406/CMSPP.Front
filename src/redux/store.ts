import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import sppReducer from "./sppReducer";

const store = configureStore({
  reducer: {
    reducer: reducer,
    sppReducer: sppReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
