// Library
import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";

// Constants
import { Transaction } from "../../constants/types";

// Context
import { useData } from "../../context/dataContext";

// Components
import EditTransactionItem from "./EditTransactionItem";

interface TransactionProps {
  item: Transaction;
}

const buttonWidth: number = 140;

const TransactionItem: React.FC<TransactionProps> = ({ item }) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const [showEditForm, setShowEditForm] = useState(false);
  const { data, setData } = useData();

  // Find the Source attached
  const sourceFrom = data.sources.find(
    (source) => source.docId === item.sourceId
  );

  // Handle long press
  const handleLongPress = () => {
    Animated.spring(translateX, {
      toValue: -buttonWidth,
      useNativeDriver: true,
    }).start();
  };

  // Function to handle button presses
  const handleButtonPress = (action: "edit" | "delete") => {
    if (action === "delete") {
      reset();
      const newTransactionsList = data.transactions.filter(
        (source) => source.docId !== item.docId
      );
      setData({
        ...data,
        transactions: newTransactionsList,
      });
    } else {
      reset();
      setShowEditForm(true);
    }
  };

  // Reset to hidden state
  const reset = () => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPress={reset}
      onLongPress={handleLongPress}
      activeOpacity={1} // Keep the item opaque during interaction
    >
      <Animated.View
        style={[styles.transactionItem, { transform: [{ translateX }] }]}
      >
        {showEditForm ? (
          <EditTransactionItem setShowEditForm={setShowEditForm} item={item} />
        ) : (
          <>
            <View style={styles.row}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.whichSource}>
                {sourceFrom ? sourceFrom.title : "Source not Found"}
              </Text>
            </View>
            <Text
              style={[
                styles.amount,
                item.type === "income" ? styles.income : styles.expense,
              ]}
            >
              {item.amount}
            </Text>
          </>
        )}
      </Animated.View>
      <View style={styles.buttonsBox}>
        <TouchableOpacity
          style={[styles.button, styles.edit]}
          onPress={() => handleButtonPress("edit")}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.delete]}
          onPress={() => handleButtonPress("delete")}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  transactionItem: {
    position: "relative",
    gap: 10,
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
    backgroundColor: "#333",
    borderRadius: 5,
    borderColor: "#333",
    borderWidth: 1,
  },
  row: {
    flexDirection: "column",
    gap: 3,
  },
  title: {
    fontWeight: "normal",
    color: "#ffffff",
    fontSize: 15,
  },
  amount: {
    paddingHorizontal: 5,
    paddingVertical: 3,
    overflow: "hidden",
    borderRadius: 5,
    fontSize: 16,
    fontWeight: "400",
  },
  income: {
    color: "white",
    backgroundColor: "#5ca95c",
  },
  expense: {
    color: "white",
    backgroundColor: "#F37267",
  },
  buttonsBox: {
    backgroundColor: "#6495ED",
    width: "90%",
    margin: 5,
    height: 45,
    borderRadius: 5,
    justifyContent: "flex-end",
    zIndex: -1,
    right: 0,
    position: "absolute",
    flexDirection: "row",
  },
  button: {
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#D3D3D3",
  },
  edit: {
    backgroundColor: "#6495ED",
  },
  delete: {
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: "#F37267",
  },
  whichSource: {
    color: "#c1c1c1",
    fontSize: 10,
  },
});
export default TransactionItem;
