"use client";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setSelectedGender, clearSelectedGender, GenderOption } from "../store/genderSlice";

export function useGenderSelection() {
  const dispatch = useAppDispatch();
  const selectedGender = useAppSelector((state) => state.gender.selectedGender);

  const setGender = (gender: GenderOption) => dispatch(setSelectedGender(gender));
  const clearGender = () => dispatch(clearSelectedGender());

  return {
    selectedGender,
    setGender,
    clearGender,
  };
}
