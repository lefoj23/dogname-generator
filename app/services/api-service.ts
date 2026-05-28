import axios from "axios";
import { environment } from "../config/environment";
import { ICategoriesResponse } from "../models/categories";
import { ILettersResponse } from "../models/letters";
import { IJsonBinResponse } from "../models/jsonbin";
import { INamesResponse } from "../models/names";

const API_KEY = environment.api.driveApiKey;

export async function fetchCategoriesDriveData(): Promise<ICategoriesResponse> {
  const url = environment.featureflag.useGoogleDriveStorage
    ? `${environment.api.driveApiUrl}/${environment.api.categoriesDriveFileId}?alt=media&key=${API_KEY}`
    : `${environment.api.jsonStorageApiUrl}${environment.api.categoriesDriveFileId}`;

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

  const response = await axios.get<ICategoriesResponse>(url, {
    headers: { "X-API-Key": environment.api.jsonStorageMasterKey },
  });
  await new Promise((resolve) =>
    setTimeout(resolve, environment.featureflag.simulateSlowNetwork ? 2000 : 0),
  );
  return response.data;
}

export async function fetchLettersDriveData(): Promise<ILettersResponse> {
  const url = environment.featureflag.useGoogleDriveStorage
    ? `${environment.api.driveApiUrl}/${environment.api.lettersDriveFileId}?alt=media&key=${API_KEY}`
    : `${environment.api.jsonStorageApiUrl}${environment.api.lettersDriveFileId}`;

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

  const response = await axios.get<ILettersResponse>(url, {
    headers: { "X-API-Key": environment.api.jsonStorageMasterKey },
  });
  await new Promise((resolve) =>
    setTimeout(resolve, environment.featureflag.simulateSlowNetwork ? 1000 : 0),
  );

  return response.data;
}

export async function fetchNamesDriveData(): Promise<INamesResponse> {
  // const url = `${environment.api.driveApiUrl}/${environment.api.namesDriveFileId}?alt=media&key=${API_KEY}`;

  // const response = await axios.get<INamesResponse>(url);
  // await new Promise((resolve) =>
  //   setTimeout(resolve, environment.featureflag.simulateSlowNetwork ? 1000 : 0),
  // );
  // return response.data;
  const url = environment.featureflag.useGoogleDriveStorage
    ? `${environment.api.driveApiUrl}/${environment.api.namesDriveFileId}?alt=media&key=${API_KEY}`
    : `${environment.api.jsonStorageApiUrl}${environment.api.namesDriveFileId}`;

  if (environment.featureflag.useGoogleDriveStorage) {
    const response = await axios.get<INamesResponse>(url);
    await new Promise((resolve) =>
      setTimeout(
        resolve,
        environment.featureflag.simulateSlowNetwork ? 1000 : 0,
      ),
    );
    return response.data;
  }

  const response = await axios.get<INamesResponse>(url, {
    headers: { "X-API-Key": environment.api.jsonStorageMasterKey },
  });
  await new Promise((resolve) =>
    setTimeout(resolve, environment.featureflag.simulateSlowNetwork ? 1000 : 0),
  );

  return response.data;
}
