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

export type TSource = {
  docId: string;
  title: string;
  amount: number;
};

export type SourcesListType = TSource[];

// DATA TYPES FOR FILE SYSTEM
export interface IData {
  transactions: TransactionsListType;
  sources: SourcesListType;
}

export const dataDefaultValue: IData = {
  transactions: [],
  sources: [],
};

// MODAL
