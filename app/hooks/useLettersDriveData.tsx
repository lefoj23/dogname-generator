"use client";

import { useEffect } from "react";
import { fetchLettersDriveData } from "../services/api-service";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setLetters, setLoading, setError } from "../store/lettersSlice";

export function useLettersDriveData() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.letters.data);
  const loading = useAppSelector((state) => state.letters.isLoading);
  const error = useAppSelector((state) => state.letters.error);

  const loadLetters = async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const result = await fetchLettersDriveData();
      dispatch(setLetters(result));
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : "Failed to load letters"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    void loadLetters();
  }, []);

  return {
    data,
    loading,
    error,
    refresh: loadLetters,
  };
}
