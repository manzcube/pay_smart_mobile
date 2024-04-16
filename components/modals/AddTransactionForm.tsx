import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Text } from "../Themed";
import { useData } from "../../context/dataContext";
import { router } from "expo-router";
import {
  initializeDataFile,
  retrieveDataFromTheFileSystem,
  saveDataToFileSystem,
} from "../../services/DataService";
import { TSource, Transaction } from "../../constants/types";
import DropDown from "./DropDown";

type TransactionFormProps = {
  transactionType: "income" | "expense";
};

const AddTransactionForm: React.FC<TransactionFormProps> = ({
  transactionType,
}) => {
  const { data, setData } = useData();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());
  const [selectedSource, setSelectedSource] = useState<TSource>(
    data.sources[0]
  );

  // On change date func
  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const handleSubmit = async () => {
    if (!title || !amount || !selectedSource) {
      Alert.alert("Please fill in all fields");
      return;
    }
    if (isNaN(+amount)) {
      Alert.alert("Please enter a valid number for amount");
      return;
    }

    const newTransaction: Transaction = {
      docId: Math.random().toString(36).substring(2),
      title,
      amount: parseFloat(amount),
      date: date.toISOString().split("T")[0], // Save as YYYY-MM-DD format
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

      // Income / Expense new Source
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
      <Text style={styles.title}>Add a New {transactionType}</Text>
      <View style={styles.dateContainer}>
        {/* <Text style={styles.dateText}>Date</Text> */}
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      </View>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Transaction title"
      />
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        placeholder="Amount"
        keyboardType="decimal-pad"
      />
      <DropDown
        selectedSource={selectedSource}
        setSelectedSource={setSelectedSource}
        sources={data.sources}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Transaction</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
    height: "100%",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
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
  dateContainer: {
    width: "100%",
    alignItems: "flex-start", // Align the picker to the left
    marginVertical: 20,
  },
  dateText: {
    color: "#fff",
    marginBottom: 10,
    fontSize: 16,
  },
  picker: {
    color: "#fff",
    width: "100%",
    // backgroundColor: "#333",
    marginVertical: 8,
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#333",
    alignItems: "center",
    borderRadius: 5,
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
