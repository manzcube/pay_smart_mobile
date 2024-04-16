import {
  TransactionsListType,
  TSource,
  SourcesListType,
  GroupTransactionsByDateType,
} from "../constants/types";

export const groupTransactionsByDate: (
  transactions: TransactionsListType
) => GroupTransactionsByDateType = (transactions) => {
  const grouped: { [key: string]: TransactionsListType } = {};

  transactions.forEach((transaction) => {
    if (!grouped[transaction.date]) {
      grouped[transaction.date] = [];
    }
    grouped[transaction.date].push(transaction);
  });

  return Object.keys(grouped).map((date) => ({
    title: date,
    data: grouped[date],
  }));
};

// Function to format numbers with commas
export const formatNumber = (number: number) => {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(
    number
  );
};

// Sum all sources values
export const sumSourcesAmounts: (sources: SourcesListType) => number = (
  sources
) => {
  return sources.reduce(
    (total: number, source: TSource) => total + source.amount,
    0
  );
};
