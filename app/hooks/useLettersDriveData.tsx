"use client";

import { useEffect, useState } from "react";
import { fetchLettersDriveData } from "../services/api-service";
import { ILettersResponse } from "../models/letters";

export function useLettersDriveData() {
  const [data, setData] = useState<ILettersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadLetters = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchLettersDriveData();
      setData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to load letters"),
      );
    } finally {
      setLoading(false);
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
