import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoryState {
  selectedCategoryIds: string[];
}

const initialState: CategoryState = {
  selectedCategoryIds: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory(state, action: PayloadAction<string>) {
      if (!state.selectedCategoryIds.includes(action.payload)) {
        state.selectedCategoryIds.push(action.payload);
      }
    },
    removeCategory(state, action: PayloadAction<string>) {
      state.selectedCategoryIds = state.selectedCategoryIds.filter(
        (id) => id !== action.payload,
      );
    },
    toggleCategory(state, action: PayloadAction<string>) {
      if (state.selectedCategoryIds.includes(action.payload)) {
        state.selectedCategoryIds = state.selectedCategoryIds.filter(
          (id) => id !== action.payload,
        );
      } else {
        state.selectedCategoryIds.push(action.payload);
      }
    },
    clearCategories(state) {
      state.selectedCategoryIds = [];
    },
  },
});

export const {
  addCategory,
  removeCategory,
  toggleCategory,
  clearCategories,
} = categorySlice.actions;

export default categorySlice.reducer;
