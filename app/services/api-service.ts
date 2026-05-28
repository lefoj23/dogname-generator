import axios from "axios";
import { environment } from "../config/environment";
import { ICategoriesResponse } from "../models/categories";
import { ILettersResponse } from "../models/letters";
import { IJsonBinResponse } from "../models/jsonbin";

const API_KEY = environment.api.driveApiKey;

export async function fetchCategoriesDriveData(): Promise<ICategoriesResponse> {
  const url = environment.featureflag.useGoogleDriveStorage
    ? `${environment.api.driveApiUrl}/${environment.api.categoriesDriveFileId}?alt=media&key=${API_KEY}`
    : `${environment.api.jsonBinApiUrl}${environment.api.categoriesDriveFileId}`;

  if (environment.featureflag.useGoogleDriveStorage) {
    const response = await axios.get<ICategoriesResponse>(url);
    await new Promise((resolve) =>
      setTimeout(
        resolve,
        environment.featureflag.simulateSlowNetwork ? 2000 : 0,
      ),
    );
    return response.data;
  }

  const response = await axios.get<IJsonBinResponse>(url, {
    headers: { "X-Master-Key": environment.api.jsonBinMasterKey },
  });
  await new Promise((resolve) =>
    setTimeout(resolve, environment.featureflag.simulateSlowNetwork ? 2000 : 0),
  );
  return response.data.record as ICategoriesResponse;
}

export async function fetchLettersDriveData(): Promise<ILettersResponse> {
  const url = environment.featureflag.useGoogleDriveStorage
    ? `${environment.api.driveApiUrl}/${environment.api.lettersDriveFileId}?alt=media&key=${API_KEY}`
    : `${environment.api.jsonBinApiUrl}${environment.api.lettersDriveFileId}`;

  if (environment.featureflag.useGoogleDriveStorage) {
    const response = await axios.get<ILettersResponse>(url);
    await new Promise((resolve) =>
      setTimeout(
        resolve,
        environment.featureflag.simulateSlowNetwork ? 1000 : 0,
      ),
    );
    return response.data;
  }

  const response = await axios.get<IJsonBinResponse>(url, {
    headers: { "X-Master-Key": environment.api.jsonBinMasterKey },
  });
  await new Promise((resolve) =>
    setTimeout(resolve, environment.featureflag.simulateSlowNetwork ? 1000 : 0),
  );

  return response.data.record as ILettersResponse;
}
