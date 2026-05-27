"use client";

import { useEffect, useState } from "react";
import { fetchCategoriesDriveData } from "../services/api-service";
import { ICategoriesResponse } from "../models/categories";

export function useCategoriesDriveData() {
  const [data, setData] = useState<ICategoriesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadCategories = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchCategoriesDriveData();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load categories"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadCategories();
  }, []);

  return {
    data,
    loading,
    error,
    refresh: loadCategories,
  };
}
