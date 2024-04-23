// Library
import React, { createContext, useContext, useEffect, useState } from "react";

// Types and Constants
import {
  DataContextProps,
  ReactNodeChildrenProps,
  IData,
} from "../constants/types";
import { dataDefaultValue } from "../constants/variables";

// File System API
import { retrieveDataFromTheFileSystem } from "../services/DataService";

// Create context
const DataContext = createContext<DataContextProps>({
  data: dataDefaultValue,
  setData: () => {}, // A function to update the modal type
});

// Make use of Context
export const useData = () => useContext(DataContext);

export const DataProvider: React.FC<ReactNodeChildrenProps> = ({
  children,
}) => {
  const [data, setData] = useState<IData>(dataDefaultValue);

  useEffect(() => {
    const fetchData = async () => {
      const data = await retrieveDataFromTheFileSystem();
      if (data && data.sources) {
        setData(data);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};
