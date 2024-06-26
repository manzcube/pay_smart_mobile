// Library
import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Text } from "../Themed";

// Context
import { useData } from "../../context/dataContext";

// File System API
import {
  retrieveDataFromTheFileSystem,
  saveDataToFileSystem,
} from "../../services/DataService";

// Types
import {
  IData,
  TSource,
  Transaction,
  TransactionFormProps,
} from "../../constants/types";

// Components
import DropDown from "./DropDown";

// Helper Functions
import { formatDate } from "../../helpers/helpersFunctions";

const AddTransactionForm: React.FC<TransactionFormProps> = ({
  transactionType,
}) => {
  const { data, setData } = useData();
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [selectedSource, setSelectedSource] = useState<TSource>(
    data.sources[0]
  );

  // On change Date handler
  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  // Create a Transaction Function
  const handleSubmit = async () => {
    // Verifiy fields
    if (!title || !amount || !selectedSource) {
      Alert.alert("Please fill in all fields");
      return;
    }
    if (isNaN(+amount)) {
      Alert.alert("Please enter a valid number for amount");
      return;
    }

    // Create new Transaction Object
    const newTransaction: Transaction = {
      docId: Math.random().toString(36).substring(2),
      title,
      amount: parseFloat(amount),
      date: formatDate(date),
      sourceId: selectedSource.docId,
      type: transactionType,
    };

    // Write new transaction in the File System
    try {
      const currentData = await retrieveDataFromTheFileSystem();
      if (!currentData) {
        throw new Error("Failed to retrieve data.");
      }

      // Correctly update the transactions array
      const updatedTransactions = [...currentData.transactions, newTransaction];

      // Add or substract the respective amount from the Source
      const newSourceAmount =
        transactionType === "income"
          ? selectedSource.amount + parseFloat(amount)
          : selectedSource.amount - parseFloat(amount);

      // Access sources and update
      const updatedSources = currentData.sources.map((source: TSource) =>
        source.docId === selectedSource.docId
          ? { ...source, amount: newSourceAmount }
          : source
      );

      // Update all data
      const updatedData = {
        ...currentData,
        transactions: updatedTransactions,
        sources: updatedSources,
      };

      // Save the updated data
      await saveDataToFileSystem(updatedData).then(() => {
        setData(updatedData);
      });

      // Reset form
      setTitle("");
      setAmount("");
      setDate(new Date());

      // Redirect back
      router.back();
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "Failed to add the transaction. Please try again.");
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>{transactionType.toLocaleUpperCase()}</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Transaction title"
      />
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.input_amount]}
          value={amount}
          onChangeText={setAmount}
          placeholder="Amount"
          keyboardType="decimal-pad"
        />
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      </View>
      <DropDown
        selectedSource={selectedSource}
        setSelectedSource={setSelectedSource}
        sources={data.sources}
      />
      <TouchableOpacity
        style={[styles.button, styles.submitButton]}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>
          {transactionType === "income" ? "Add Income" : "Add Expense"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.cancelButton]}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
    gap: 15,
    height: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#b4b4b4",
  },
  input: {
    color: "#fff",
    borderRadius: 5,
    height: 50,
    borderColor: "gray",
    backgroundColor: "#333",
    borderBottomWidth: 2,
    padding: 10,
    marginVertical: 8,
  },
  input_amount: {
    width: "65%",
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#333",
    alignItems: "center",
    borderRadius: 5,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
  submitButton: {
    backgroundColor: "#4682b4",
    borderColor: "#315b7d",
  },
  cancelButton: {
    backgroundColor: "#F37267",
    borderColor: "#aa4f48",
  },
  buttonText: {
    fontSize: 16,
    textTransform: "uppercase",
    color: "white",
  },
  noSourcesText: {
    color: "#fff",
    padding: 10,
    textAlign: "center",
  },
});

export default AddTransactionForm;
