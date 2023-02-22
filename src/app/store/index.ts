import { AnyAction, configureStore } from "@reduxjs/toolkit";
import chatSlice from "./chatSlice";
import pageSlice from "./pageSlice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import { getEnvironment } from "../../utils";
const environment = getEnvironment();

export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    chat: chatSlice,
    page: pageSlice,
  },
  middleware: [thunk] as const,
  devTools: environment === "development" ? true : false,
});

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
