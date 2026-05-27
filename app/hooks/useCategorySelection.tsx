"use client";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  addCategory,
  removeCategory,
  toggleCategory as toggleCategoryAction,
  clearCategories,
} from "../store/categorySlice";

export function useCategorySelection() {
  const dispatch = useAppDispatch();
  const selectedCategoryIds = useAppSelector((s) => s.category.selectedCategoryIds);

  const add = (id: string) => dispatch(addCategory(id));
  const remove = (id: string) => dispatch(removeCategory(id));
  const toggle = (id: string) => dispatch(toggleCategoryAction(id));
  const clear = () => dispatch(clearCategories());
  const isSelected = (id: string) => selectedCategoryIds.includes(id);

  return {
    selectedCategoryIds,
    addCategory: add,
    removeCategory: remove,
    toggleCategory: toggle,
    clearCategories: clear,
    isCategorySelected: isSelected,
  };
}
