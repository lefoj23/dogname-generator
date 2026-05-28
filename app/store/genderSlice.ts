import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type GenderOption = "Male" | "Female" | "Both" | null;

interface GenderState {
  selectedGender: GenderOption;
}

const initialState: GenderState = {
  selectedGender: null,
};

const genderSlice = createSlice({
  name: "gender",
  initialState,
  reducers: {
    setSelectedGender(state, action: PayloadAction<GenderOption>) {
      state.selectedGender = action.payload;
    },
    clearSelectedGender(state) {
      state.selectedGender = null;
    },
  },
});

export const { setSelectedGender, clearSelectedGender } = genderSlice.actions;
export default genderSlice.reducer;
