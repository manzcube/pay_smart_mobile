// Library
import React, { useState } from "react";
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

// Context
import { useData } from "../../context/dataContext";

// File System API
import {
  retrieveDataFromTheFileSystem,
  saveDataToFileSystem,
} from "../../services/DataService";

// Constants
import {
  TSource,
  Transaction,
  TransactionItemFormProps,
} from "../../constants/types";

// Helper Functions
import { formatDate } from "../../helpers/helpersFunctions";

// Components
import SmallDropDown from "./SmallDropDown";

const EditTransactionItem: React.FC<TransactionItemFormProps> = ({
  item,
  setShowEditForm,
}) => {
  const { data, setData } = useData();
  const [title, setTitle] = useState(item.title);
  const [amount, setAmount] = useState(item.amount.toString());
  const [date, setDate] = useState(new Date(item.date));
  const [selectedSource, setSelectedSource] = useState<TSource>(
    data.sources[0]
  );

  // Handle on change Date
  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  // Update transaction Function
  const updateTransaction = async () => {
    if (!title || !amount || !selectedSource) {
      Alert.alert("Please fill in all fields");
      return;
    }
    if (isNaN(+amount)) {
      Alert.alert("Please enter a valid number for amount");
      return;
    }

    // Create new transaction object
    const updatedTransaction: Transaction = {
      docId: item.docId,
      title,
      amount: parseFloat(amount),
      date: formatDate(date),
      sourceId: selectedSource.docId,
      type: item.type,
    };

    // Write new transaction in the File System
    try {
      const currentData = await retrieveDataFromTheFileSystem();
      if (!currentData) {
        throw new Error("Failed to retrieve data.");
      }

      // Correctly update the transactions array
      const updatedTransactions = currentData.transactions.map(
        (transaction: Transaction) =>
          transaction.docId === item.docId ? updatedTransaction : transaction
      );

      // New Sources var
      let updatedSources: TSource[];

      // Check if source changed to modify respective values
      if (item.sourceId === selectedSource.docId) {
        const newSourceAmount =
          item.type === "income"
            ? selectedSource.amount - item.amount + parseFloat(amount)
            : selectedSource.amount + item.amount - parseFloat(amount);

        // Access sources and update
        updatedSources = currentData.sources.map((source: TSource) =>
          source.docId === selectedSource.docId
            ? { ...source, amount: newSourceAmount }
            : source
        );
      } else {
        // In case of being different source, we have to restore previous value
        const newSourceAmount =
          item.type === "income"
            ? selectedSource.amount + parseFloat(amount)
            : selectedSource.amount - parseFloat(amount);

        // Access previous source and restore
        const restoredSources = currentData.sources.map((source: TSource) =>
          source.docId === item.sourceId
            ? {
                ...source,
                amount:
                  item.type === "income"
                    ? source.amount - item.amount
                    : source.amount + item.amount,
              }
            : source
        );

        // Update value of new source
        updatedSources = restoredSources.map((source: TSource) =>
          source.docId === selectedSource.docId
            ? { ...source, amount: newSourceAmount }
            : source
        );
      }

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

      // Close form
      setShowEditForm(false);
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "Failed to add the transaction. Please try again.");
    }
  };

  return (
    <View style={styles.formContainer}>
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
      <SmallDropDown
        selectedSource={selectedSource}
        setSelectedSource={setSelectedSource}
        sources={data.sources}
      />
      <TouchableOpacity
        style={[styles.button, styles.submitButton]}
        onPress={updateTransaction}
      >
        <Text style={styles.buttonText}>save</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.cancelButton]}
        onPress={() => setShowEditForm(false)}
      >
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    gap: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    color: "#fff",
    borderRadius: 5,
    padding: 8,
    backgroundColor: "#595959",
  },
  input_amount: {
    width: "65%",
  },
  button: {
    padding: 8,
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
    fontSize: 14,
    textTransform: "uppercase",
    color: "white",
  },
});

export default EditTransactionItem;
