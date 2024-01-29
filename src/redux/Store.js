import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './features/userSlice'
import { AuthApi } from "./api/AuthApi";
import { HomeApi } from "./api/HomeApi";

export const store = configureStore({
  reducer: {
    User: UserReducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [HomeApi.reducerPath]:HomeApi.reducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      AuthApi.middleware,
      HomeApi.middleware
    ]),
});