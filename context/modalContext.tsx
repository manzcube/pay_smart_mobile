// Library
import React, { createContext, useContext, useState, ReactNode } from "react";

// Types
import {
  ModalTypeContextProps,
  ReactNodeChildrenProps,
} from "../constants/types";

// Create context
const ModalTypeContext = createContext<ModalTypeContextProps>({
  modalType: "default", // This can be 'income', 'expense', 'addSource', or any other identifier you need
  setModalType: () => {}, // A function to update the modal type
});

// Make use of Context
export const useModalType = () => useContext(ModalTypeContext);

export const ModalTypeProvider: React.FC<ReactNodeChildrenProps> = ({
  children,
}) => {
  const [modalType, setModalType] = useState<string>("default");

  return (
    <ModalTypeContext.Provider value={{ modalType, setModalType }}>
      {children}
    </ModalTypeContext.Provider>
  );
};
