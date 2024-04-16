import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { IData, dataDefaultValue } from "../constants/types";
import { retrieveDataFromTheFileSystem } from "../services/DataService";

type DataContextProps = {
  data: IData;
  setData: (data: IData) => void;
};

// Create context
const DataContext = createContext<DataContextProps>({
  data: dataDefaultValue,
  setData: () => {}, // A function to update the modal type
});

// Make use of Context
export const useData = () => useContext(DataContext);

// Typing the provider props to accept ReactNode children
type DataProviderProps = {
  children: ReactNode;
};

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = useState(dataDefaultValue);

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
