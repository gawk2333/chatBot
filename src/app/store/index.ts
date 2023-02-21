import { AnyAction, configureStore } from "@reduxjs/toolkit";
import chatSlice from "./chatSlice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import logger from "redux-logger";
import { getEnvironment } from "../../utils";
const environment = getEnvironment();

export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    chat: chatSlice,
  },
  middleware: [thunk, logger] as const,
  devTools: environment === "development" ? true : false,
});

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
