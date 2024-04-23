// Library
import React from "react";
import { View, Text } from "../Themed";
import { TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

// Constants
import { size } from "../../constants/variables";
import { TSource, EditSourceItemProps } from "../../constants/types";

// File System API
import {
  retrieveDataFromTheFileSystem,
  saveDataToFileSystem,
} from "../../services/DataService";

// Context
import { useData } from "../../context/dataContext";

const EditSourceForm: React.FC<EditSourceItemProps> = ({
  title,
  amount,
  setTitle,
  closeAll,
  item,
  setAmount,
}) => {
  const { setData } = useData();

  // Update Source Function
  const updateSource = async (id: string) => {
    try {
      // Read the current data file
      const currentData = await retrieveDataFromTheFileSystem();
      if (!currentData) {
        throw new Error("Failed to retrieve data");
      }

      // Construct the updated source object
      const updatedSource = { ...item, title, amount: parseFloat(amount) };

      // Map over sources and update the matching source
      const updatedSources = currentData.sources.map((source: TSource) =>
        source.docId === item.docId ? updatedSource : source
      );

      // Update all data
      const updatedData = {
        ...currentData,
        sources: updatedSources,
      };

      // Write updated data
      await saveDataToFileSystem(updatedData).then(() => {
        // Set Data Context with updated data
        setData(updatedData);
      });

      closeAll();
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "Failed to DELETE the source. Please try again.");
    }
  };

  return (
    <View style={styles.updateSourceItem}>
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
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, styles.submitButton]}
          onPress={() => updateSource(item.docId)}
        >
          <Text style={styles.buttonText}>Update Source</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={closeAll}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  updateSourceItem: {
    width: size,
    height: size,
    padding: 10,
    margin: 5,
    backgroundColor: "#333",
    borderRadius: 5,
  },
  row: {
    height: "50%",
    gap: 8,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
  },
  input: {
    color: "#fff",
    borderRadius: 5,
    padding: 8,
    backgroundColor: "#595959",
    marginVertical: 8,
  },
  button: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
  cancelButton: {
    backgroundColor: "#F37267",
    borderColor: "#aa4f48",
  },
  submitButton: {
    backgroundColor: "#4682b4",
    borderColor: "#315b7d",
  },
});

export default EditSourceForm;
