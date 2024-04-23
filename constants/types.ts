// Library
import { ReactNode } from "react";

// MODALS
export type TransactionFormProps = {
  transactionType: "income" | "expense";
};

export interface DropDownProps {
  sources: SourcesListType;
  selectedSource: TSource;
  setSelectedSource: (source: TSource) => void;
}

// SOURCES
export type TSource = {
  docId: string;
  title: string;
  amount: number;
};

export type SourcesListType = TSource[];

export interface EditSourceContainerProps {
  item: TSource;
  closeAll: () => void;
  setOnUpdatingSource: (onUpdatingSource: boolean) => void;
}

export interface EditSourceItemProps {
  title: string;
  amount: string;
  item: TSource;
  setTitle: (title: string) => void;
  setAmount: (amount: string) => void;
  closeAll: () => void;
}

export type SourceProps = {
  item: TSource;
};

export interface SourceItemProps {
  item: TSource;
  setOnEdit: (onEdit: boolean) => void;
}

// TRANSACTIONS
export type Transaction = {
  docId: string;
  sourceId: string;
  date: string;
  title: string;
  amount: number;
  type: string;
};

export type TransactionsListType = Transaction[];

export type GroupTransactionsByDateType = {
  title: string;
  data: TransactionsListType;
}[];

export type TransactionItemFormProps = {
  item: Transaction;
  setShowEditForm: (b: boolean) => void;
};

export type TGroupedTransactions = {
  title: string;
  data: TransactionsListType;
}[];

export interface SmallDropDownProps {
  sources: SourcesListType;
  selectedSource: TSource;
  setSelectedSource: (source: TSource) => void;
}

// CONTEXT (DATA & MODAL)
export interface IData {
  transactions: TransactionsListType;
  sources: SourcesListType;
}

export type DataContextProps = {
  data: IData;
  setData: (data: IData) => void;
};

export type ModalTypeContextProps = {
  modalType: string;
  setModalType: (modalType: string) => void;
};

// Typing the provider props to accept ReactNode children
export type ReactNodeChildrenProps = {
  children: ReactNode;
};
