"use client";

import { useEffect } from "react";
import { fetchNamesDriveData } from "../services/api-service";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setNames, setLoading, setError } from "../store/namesSlice";

export function useNamesDriveData() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.names.data);
  const loading = useAppSelector((state) => state.names.isLoading);
  const error = useAppSelector((state) => state.names.error);

  const loadNames = async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const result = await fetchNamesDriveData();
      dispatch(setNames(result));
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : "Failed to load names"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    void loadNames();
  }, []);

  return {
    data,
    loading,
    error,
    refresh: loadNames,
  };
}
