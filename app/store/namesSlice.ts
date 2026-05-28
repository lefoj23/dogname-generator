import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INamesResponse } from "../models/names";

interface NamesState {
  data: INamesResponse | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: NamesState = {
  data: null,
  isLoading: false,
  error: null,
};

const namesSlice = createSlice({
  name: "names",
  initialState,
  reducers: {
    setNames(state, action: PayloadAction<INamesResponse | null>) {
      state.data = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearNames(state) {
      state.data = null;
      state.error = null;
      state.isLoading = false;
    },
  },
});

export const { setNames, setLoading, setError, clearNames } = namesSlice.actions;
export default namesSlice.reducer;
