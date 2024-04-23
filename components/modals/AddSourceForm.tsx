// Library
import React, { useState } from "react";
import { View, TextInput, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
import { Text } from "../Themed";

// Context
import { useData } from "../../context/dataContext";

// Types
import { TSource } from "../../constants/types";

// File System API
import {
  retrieveDataFromTheFileSystem,
  saveDataToFileSystem,
} from "../../services/DataService";

const AddSourceForm: React.FC = () => {
  const { setData } = useData();
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  // Func to create a Source
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

    // Create new Source Object
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

      // Go back
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
      <TouchableOpacity
        style={[styles.button, styles.submitButton]}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Create Source</Text>
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
    height: "100%",
    gap: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
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
});

export default AddSourceForm;
