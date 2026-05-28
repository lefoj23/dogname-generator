import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILettersResponse } from "../models/letters";

interface LettersState {
  data: ILettersResponse | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: LettersState = {
  data: null,
  isLoading: false,
  error: null,
};

const lettersSlice = createSlice({
  name: "letters",
  initialState,
  reducers: {
    setLetters(state, action: PayloadAction<ILettersResponse | null>) {
      state.data = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearLetters(state) {
      state.data = null;
      state.error = null;
      state.isLoading = false;
    },
  },
});

export const { setLetters, setLoading, setError, clearLetters } = lettersSlice.actions;
export default lettersSlice.reducer;
