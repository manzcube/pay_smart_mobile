// Types
import {
  TransactionsListType,
  TSource,
  SourcesListType,
  GroupTransactionsByDateType,
} from "../constants/types";

// Take transactions and group them by date
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

// Func to sum all values form sources
export const sumSourcesAmounts: (sources: SourcesListType) => number = (
  sources
) => {
  return sources.reduce(
    (total: number, source: TSource) => total + source.amount,
    0
  );
};

// Format Date in right location
export const formatDate: (date: Date) => string = (date) => {
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);

  return `${year}-${month}-${day}`;
};
