export const environment = {
  api: {
    driveApiUrl: "https://www.googleapis.com/drive/v3/files",
    // categoriesDriveFileId: "1fSm8XBBfV3lcCjNzYEbXA_orrljbA-YU",
    // lettersDriveFileId: "1h5j_jp_8U14_l1d4pOUEmL3en19UQY4U",
    driveApiKey: "AIzaSyCma5JhTOU0ITr-tG6-qFichoykMv8JWpU",

    // alternative config for googledrive storage
    // driveApiUrl: "https://www.googleapis.com/drive/v2/files",
    // categoriesDriveFileId: "1B4A6hoRalM-fvq6Rtu1X4HUoSqJ8_NcQ",
    // lettersDriveFileId: "1aO3BpILUc6XTMqGNJbwNwyZ9e6rueHD6",
    // driveApiKey: "AIzaSyCKVJMfSdgN4_M5OxhhbqDWDdW_jaRgKd4",
    // driveApiKey: "AIzaSyDJAVX83FKfOEIwo5xEsidAIMxjKhI2OzM",

    //jsonbin config
    jsonBinApiUrl: "https://api.jsonbin.io/v3/b/",
    jsonBinMasterKey:
      "$2a$10$Ux8CBEytqiwTA5mMlqYSU.CbUnIsB/h3CSeochX43mNHlNLrA2yaG",
    categoriesDriveFileId: "6a185a18ddf5aa59f770556c",
    lettersDriveFileId: "6a1859d421f9ee59d295b5fd",
  },
  mode: "development",
  featureflag: {
    simulateSlowNetwork: true,
    useGoogleDriveStorage: false,
  },
};
