// AddSourceForm.tsx
import React, { useState } from "react";
import { View, TextInput, StyleSheet, Alert } from "react-native";
import { TSource } from "../../constants/types";
import { router } from "expo-router";

import {
  retrieveDataFromTheFileSystem,
  saveDataToFileSystem,
} from "../../services/DataService";
import { useData } from "../../context/dataContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "../Themed";

const AddSourceForm: React.FC = () => {
  const { setData } = useData();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async () => {
    // Simple validation
    if (!title || !amount) {
      Alert.alert("Please fill in all fields");
      return;
    }
    if (isNaN(+amount)) {
      Alert.alert("Please enter a valid number for amount");
      return;
    }

    const newSource: TSource = {
      docId: Math.random().toString(36).substring(2), // Generating a pseudo-unique ID
      title,
      amount: parseFloat(amount),
    };

    // Write new data into File System
    try {
      // Read the current data file
      const data = await retrieveDataFromTheFileSystem();
      if (!data) {
        throw new Error("Failed to retrieve data");
      }

      // Push New Source into sources
      const lastElment = data.sources.pop();
      data.sources.push(newSource);
      if (lastElment) data.sources.push(lastElment);

      // Write updated data
      await saveDataToFileSystem(data).then(() => {
        setData(data);
      });

      // Reset form
      setTitle("");
      setAmount("");
      router.back();
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "Failed to add the source. Please try again.");
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Add a New Source</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Source title"
      />
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        placeholder="Amount"
        keyboardType="decimal-pad"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Source</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
    height: "100%",
    gap: 50,
  },
  title: {
    fontSize: 30,
    color: "#b4b4b4",
  },
  input: {
    color: "#fff",
    height: 70,
    borderColor: "gray",
    borderRadius: 5,
    backgroundColor: "#333",
    borderBottomWidth: 2,
    padding: 20,
    marginVertical: 8,
  },
  button: {
    padding: 30,
    backgroundColor: "#333",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "white",
  },
});

export default AddSourceForm;
