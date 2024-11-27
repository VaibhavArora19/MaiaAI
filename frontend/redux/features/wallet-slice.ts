import { createSlice } from "@reduxjs/toolkit";
import { IProvider } from "@web3auth/base";

interface InitialState {
  loggedIn: boolean;
  provider: IProvider | null;
}

const initialState: InitialState = {
  loggedIn: false,
  provider: null,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    setProvider: (state, action) => {
      state.provider = action.payload;
    },
  },
});

export default walletSlice.reducer;

export const walletActions = walletSlice.actions;
