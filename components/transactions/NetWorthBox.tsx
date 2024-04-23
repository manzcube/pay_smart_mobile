// Library
import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Context
import { useData } from "../../context/dataContext";

// Helper Functions
import {
  formatNumber,
  sumSourcesAmounts,
} from "../../helpers/helpersFunctions";

export default function NetWorthBox() {
  const { data } = useData();
  const netWorthAmountAUD = sumSourcesAmounts(data.sources);
  const netWorthAmountEUR = netWorthAmountAUD / 1.64; // Conversion rate

  return (
    <View style={styles.netWorth}>
      <Text style={styles.text}>net worth</Text>
      <View style={styles.netWorthAmount}>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{formatNumber(netWorthAmountAUD)}</Text>
          <Text style={styles.currency}>AUD</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{formatNumber(netWorthAmountEUR)}</Text>
          <Text style={styles.currency}>EUR</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  netWorth: {
    margin: 8,
    marginBottom: 15,
    width: "100%",
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 14,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: "#707070",
  },
  text: {
    textTransform: "uppercase",
    fontSize: 20,
    fontWeight: "bold",
    color: "#B2BEB5",
  },
  netWorthAmount: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  amountContainer: {
    flexDirection: "row",
  },
  amount: {
    color: "#fff",
    marginRight: 4,
    fontSize: 23,
    fontWeight: "700",
  },
  currency: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#B2BEB5",
  },
});
