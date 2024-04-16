import React, { createContext, useContext, useState, ReactNode } from "react";

type ModalTypeContextProps = {
  modalType: string;
  setModalType: (modalType: string) => void;
};

// Create context
const ModalTypeContext = createContext<ModalTypeContextProps>({
  modalType: "default", // This can be 'income', 'expense', 'addSource', or any other identifier you need
  setModalType: () => {}, // A function to update the modal type
});

// Make use of Context
export const useModalType = () => useContext(ModalTypeContext);

// Typing the provider props to accept ReactNode children
type ModalTypeProviderProps = {
  children: ReactNode;
};

export const ModalTypeProvider: React.FC<ModalTypeProviderProps> = ({
  children,
}) => {
  const [modalType, setModalType] = useState("default");

  return (
    <ModalTypeContext.Provider value={{ modalType, setModalType }}>
      {children}
    </ModalTypeContext.Provider>
  );
};
