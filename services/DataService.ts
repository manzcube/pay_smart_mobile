import * as FileSystem from "expo-file-system";

import { IData } from "../constants/types";

const fielUri = `${FileSystem.documentDirectory}data.json`;

export const initializeDataFile = async () => {
  // Default data structure
  const defaultData = {
    transactions: [],
    sources: [
      {
        docId: "0",
        title: "Button",
        amount: 0,
      },
    ],
  };

  try {
    // Write the default data to the file
    await FileSystem.writeAsStringAsync(fielUri, JSON.stringify(defaultData));
    console.log("Default data file created");
  } catch (e) {
    console.error("Failed to create the default data file", e);
  }
};

export const saveDataToFileSystem = async (data: IData) => {
  try {
    await FileSystem.writeAsStringAsync(fielUri, JSON.stringify(data));
    console.log("data successfully saved into the file system");
  } catch (e) {
    console.error("Failed to save data into the file system", e);
  }
};

export const retrieveDataFromTheFileSystem = async () => {
  try {
    // Check is the data exists
    const fileData = await FileSystem.getInfoAsync(fielUri);
    if (!fileData.exists) {
      console.log("Data file doesn't exists, creating a new one ...");
      await initializeDataFile();
    }

    // If File exists, read it
    const jsonData = await FileSystem.readAsStringAsync(fielUri);
    const data = JSON.parse(jsonData);
    return data;
  } catch (e) {
    console.error("Failed to read the data from the file system", e);
    return null;
  }
};
