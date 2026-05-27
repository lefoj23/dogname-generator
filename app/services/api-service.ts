import axios from "axios";
import { environment } from "../config/environment";
import { ICategoriesResponse } from "../models/categories";

export async function fetchCategoriesDriveData(): Promise<ICategoriesResponse> {
  const apiKey = environment.api.driveApiKey;
  const url = `${environment.api.driveApiUrl}/${environment.api.categoriesDriveFileId}?alt=media&key=${apiKey}`;

  const response = await axios.get<ICategoriesResponse>(url);
  return response.data;
}
