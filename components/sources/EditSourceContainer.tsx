// Library
import React from "react";
import { View, Text } from "../Themed";
import { AntDesign, Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Alert, StyleSheet } from "react-native";

// Constants
import { TSource, EditSourceContainerProps } from "../../constants/types";
import { size } from "../../constants/variables";

// File System API
import {
  retrieveDataFromTheFileSystem,
  saveDataToFileSystem,
} from "../../services/DataService";

// Context
import { useData } from "../../context/dataContext";

const EditSourceContainer: React.FC<EditSourceContainerProps> = ({
  item,
  setOnUpdatingSource,
  closeAll,
}) => {
  const { setData } = useData();

  // Delete confirmation Alert
  const showDeleteConfirmation = () => {
    Alert.alert(
      "Confirm Deletion", // Title of the alert
      "Are you sure you want to delete this source?", // Message of the alert
      [
        {
          text: "Cancel",
          onPress: () => console.log("Deletion cancelled"), // Function for Cancel
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteSource(item.docId), // Function to execute on deletion
          style: "destructive",
        },
      ],
      { cancelable: true } // This allows tapping outside of the alert to cancel it
    );
  };

  // Delete Function
  const deleteSource: (id: string) => void = async (id) => {
    try {
      // Read the current data file
      const currentData = await retrieveDataFromTheFileSystem();
      if (!currentData) {
        throw new Error("Failed to retrieve data");
      }

      // Filter and remove specific source
      const updatedSources = currentData.sources.filter(
        (source: TSource) => source.docId !== id
      );

      // Update sources array
      const updatedData = {
        ...currentData,
        sources: updatedSources,
      };

      // Write updated data
      await saveDataToFileSystem(updatedData).then(() => {
        // Set Data Context with updated data
        setData(updatedData);
      });
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "Failed to DELETE the source. Please try again.");
    }
  };

  return (
    <View style={styles.editContainer}>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={showDeleteConfirmation}
          style={[
            styles.buttonContainer,
            styles.firstRowButton,
            styles.deleteButton,
          ]}
        >
          <AntDesign name="delete" size={24} color="#fff" />
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setOnUpdatingSource(true)} // Set to update source
          style={[
            styles.buttonContainer,
            styles.firstRowButton,
            styles.editButton,
          ]}
        >
          <Feather name="edit" size={24} color="#fff" />
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.buttonContainer, styles.secondRowButton]}
          onPress={closeAll}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  editContainer: {
    width: size,
    height: size,
    padding: 8,
    gap: 10,
    margin: 5,
    backgroundColor: "#333", // Dark item background color
    borderRadius: 5,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#333",
    justifyContent: "space-between",
  },
  buttonContainer: {
    height: "100%",
    backgroundColor: "#282828",
    gap: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  firstRowButton: {
    minWidth: "48%",
  },
  secondRowButton: {
    minWidth: "100%",
  },
  editButton: {
    backgroundColor: "#4682b4",
    borderColor: "#315b7d",
  },
  deleteButton: {
    backgroundColor: "#f37267",
    borderColor: "#aa4f48",
  },
});

export default EditSourceContainer;
