import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Link } from "expo-router";
import { useModalType } from "../../context/modalContext";

const { width } = Dimensions.get("window");
const numColumns = 2;
const size = (width - 50) / numColumns;

const TransactionsButtons: React.FC = () => {
  const { setModalType } = useModalType();

  return (
    <View style={styles.container}>
      <Link href="/modal" style={styles.button} asChild>
        <TouchableOpacity
          style={styles.income}
          onPress={() => setModalType("add-transaction-income")}
        >
          <Text style={styles.text}>income</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/modal" style={styles.button} asChild>
        <TouchableOpacity
          style={styles.expense}
          onPress={() => setModalType("add-transaction-expense")}
        >
          <Text style={styles.text}>expense</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 8,
  },
  button: {
    width: size,
    height: size / 1.5,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    // backgroundColor: "#333",
    borderRadius: 5,
  },
  text: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "white",
  },
  income: {
    backgroundColor: "#73D474",
  },
  expense: {
    backgroundColor: "#F37267",
  },
});

export default TransactionsButtons;
