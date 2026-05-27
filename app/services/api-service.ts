import axios from "axios";
import { environment } from "../config/environment";
import { ICategoriesResponse } from "../models/categories";

const API_KEY = environment.api.driveApiKey;

export async function fetchCategoriesDriveData(): Promise<ICategoriesResponse> {
  const url = `${environment.api.driveApiUrl}/${environment.api.categoriesDriveFileId}?alt=media&key=${API_KEY}`;

  const response = await axios.get<ICategoriesResponse>(url);
  await new Promise((resolve) => setTimeout(resolve, environment.featureflag.simulateSlowNetwork ? 2000 : 0));
  return response.data;
}

export async function fetchLettersDriveData(): Promise<ICategoriesResponse> {
  const url = `${environment.api.driveApiUrl}/${environment.api.lettersDriveFileId}?alt=media&key=${API_KEY}`;

  const response = await axios.get<ICategoriesResponse>(url);
  await new Promise((resolve) => setTimeout(resolve, environment.featureflag.simulateSlowNetwork ? 2000 : 0));
  return response.data;
}
