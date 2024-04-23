// Library
import React from "react";
import { View, StyleSheet } from "react-native";

// Components
import TransactionsButtons from "../../components/transactions/TransactionsButtons";
import NetWorthBox from "../../components/transactions/NetWorthBox";
import TransactionsList from "../../components/transactions/TransactionsList";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <NetWorthBox />
      <TransactionsButtons />
      <TransactionsList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
});
