export const environment = {
  api: {
    // driveApiUrl: "https://www.googleapis.com/drive/v3/files",
    // categoriesDriveFileId: "1fSm8XBBfV3lcCjNzYEbXA_orrljbA-YU",
    // lettersDriveFileId: "1h5j_jp_8U14_l1d4pOUEmL3en19UQY4U",
    // namesDriveFileId:"1FnVX4aGPSHYiXUp8Zn3QbTdZkhPlClq9",
    // driveApiKey: "AIzaSyCma5JhTOU0ITr-tG6-qFichoykMv8JWpU",

    // alternative config for googledrive storage
    driveApiUrl: "https://www.googleapis.com/drive/v2/files",
    // categoriesDriveFileId: "1B4A6hoRalM-fvq6Rtu1X4HUoSqJ8_NcQ",
    // lettersDriveFileId: "1aO3BpILUc6XTMqGNJbwNwyZ9e6rueHD6",
    // namesDriveFileId:"1FnVX4aGPSHYiXUp8Zn3QbTdZkhPlClq9",
    // driveApiKey: "AIzaSyCKVJMfSdgN4_M5OxhhbqDWDdW_jaRgKd4",
    driveApiKey: "AIzaSyDJAVX83FKfOEIwo5xEsidAIMxjKhI2OzM",

    //jsonStorage config
    jsonStorageApiUrl:
      "https://api.jsonstorage.net/v1/json/bd172555-c497-496f-a4bd-dbff4595722b/",
    jsonStorageMasterKey: "30752852-a08c-41d1-9d96-1d79617387aa",
    categoriesDriveFileId: "6422c023-2b8f-454a-8e73-093e92e01b81",
    lettersDriveFileId: "3d70ca99-fd94-46c9-960b-abcc6ecc27d8",
    namesDriveFileId: "7caaeaa1-a99c-419f-a007-ca2025d3bb68",
  },
  mode: "development",
  featureflag: {
    simulateSlowNetwork: true,
    useGoogleDriveStorage: false,
  },
};
