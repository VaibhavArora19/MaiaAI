import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "./features/wallet-slice";

export const store = configureStore({
  reducer: {
    wallet: walletReducer,
  },
});
