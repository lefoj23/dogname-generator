import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import lettersReducer from "./lettersSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    letters: lettersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
