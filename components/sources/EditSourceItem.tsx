import React from "react";
import { View, Text } from "../Themed";
import { TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { size } from "../../constants/variables";
import { TSource } from "../../constants/types";
import {
  retrieveDataFromTheFileSystem,
  saveDataToFileSystem,
} from "../../services/DataService";
import { useData } from "../../context/dataContext";

interface EditSourceItemProps {
  title: string;
  amount: string;
  item: TSource;
  setTitle: (title: string) => void;
  setAmount: (amount: string) => void;
  closeAll: () => void;
}

const EditSourceItem: React.FC<EditSourceItemProps> = ({
  title,
  amount,
  setTitle,
  closeAll,
  item,
  setAmount,
}) => {
  const updateSource: (id: string) => void = async (id) => {
    const { data, setData } = useData();
    // Delete source and update data in File System
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
          style={styles.updateButton}
          onPress={() => updateSource(item.docId)}
        >
          <Text style={styles.buttonText}>Update Source</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.updateButton} onPress={closeAll}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    height: "50%",
    gap: 8,
    alignItems: "center",
    justifyContent: "center", // Evenly space buttons in a row
    width: "100%", // Take full width of the container
  },
  buttonText: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
  },
  updateSourceItem: {
    width: size,
    height: size,
    padding: 10,
    margin: 5,
    backgroundColor: "#333", // Dark item background color
    borderRadius: 5,
  },
  input: {
    color: "#fff",
    borderColor: "gray",
    borderRadius: 5,
    padding: 8,
    backgroundColor: "#333",
    borderBottomWidth: 2,
    marginVertical: 8,
  },
  updateButton: {
    backgroundColor: "#282828",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
});

export default EditSourceItem;
