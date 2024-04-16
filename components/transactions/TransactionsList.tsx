import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SectionList } from "react-native";

import { retrieveDataFromTheFileSystem } from "../../services/DataService";
import { groupTransactionsByDate } from "../../helpers/helpersFunctions";
import { useData } from "../../context/dataContext";
import { TransactionsListType } from "../../constants/types";
import TransactionItem from "./TransactionItem";

type TGroupedTransactions = { title: string; data: TransactionsListType }[];

export default function TransactionsList() {
  const { data } = useData();
  const [groupedTransactions, setGroupedTransactions] =
    useState<TGroupedTransactions>([]);

  useEffect(() => {
    if (data.transactions.length) {
      const newList = groupTransactionsByDate(data.transactions);
      setGroupedTransactions(newList);
    }
  }, [data.transactions]);

  return groupedTransactions.length ? (
    <View style={styles.balanceList}>
      <Text style={styles.transactionsTitle}>Transactions</Text>
      {groupedTransactions.length > 0 ? (
        <SectionList
          style={styles.sectionList}
          sections={groupedTransactions.reverse()}
          keyExtractor={(item, index) => item.docId + index}
          renderItem={({ item }) => <TransactionItem item={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.dateTitle}>{title}</Text>
          )}
        />
      ) : (
        <Text style={styles.noTransactions}>No Transactions Yet</Text>
      )}
    </View>
  ) : (
    <Text style={styles.noTransactions}>Grouping Transactions By Date...</Text>
  );
}

const styles = StyleSheet.create({
  transactionsTitle: {
    color: "#fff",
    marginBottom: 12,
    marginTop: 12,
    fontSize: 17,
    fontWeight: "600",
  },
  sectionList: {
    marginLeft: 8,
  },
  balanceList: {
    marginTop: 20,
    width: "100%",
    justifyContent: "flex-start",
  },
  transactionDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    fontWeight: "700",
    fontSize: 15, // Adjusted from 1.3ch
    color: "rgb(153, 153, 153)",
  },
  dateTitle: {
    fontWeight: "bold",
    fontSize: 15,
    backgroundColor: "#000",
    color: "#B2BEB5",
    borderRadius: 5,
    overflow: "hidden", // For rounded corners
    paddingTop: 17,
    marginBottom: 3,
  },
  noTransactions: {
    marginTop: "40%",
    fontSize: 16,
    color: "#B2BEB5",
    textAlign: "center",
  },
});
