// Library
import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Link } from "expo-router";

// Constants
import { size } from "../../constants/variables";

// Context
import { useModalType } from "../../context/modalContext";

const TransactionsButtons: React.FC = () => {
  const { setModalType } = useModalType();

  return (
    <View style={styles.container}>
      <Link href="/modal" style={styles.button} asChild>
        <TouchableOpacity
          style={styles.income}
          onPress={() => setModalType("add-income")}
        >
          <Text style={styles.text}>income</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/modal" style={styles.button} asChild>
        <TouchableOpacity
          style={styles.expense}
          onPress={() => setModalType("add-expense")}
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
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderRadius: 8,
  },
  text: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "white",
  },
  income: {
    backgroundColor: "#73D474",
    borderColor: "#509451",
  },
  expense: {
    backgroundColor: "#F37267",
    borderColor: "#aa4f48",
  },
});

export default TransactionsButtons;
