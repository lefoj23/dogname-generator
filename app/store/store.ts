import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import lettersReducer from "./lettersSlice";
import genderReducer from "./genderSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    letters: lettersReducer,
    gender: genderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
