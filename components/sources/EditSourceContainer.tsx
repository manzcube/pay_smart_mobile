import React from "react";
import { View, Text } from "../Themed";
import { AntDesign, Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TSource } from "../../constants/types";
import { Alert, StyleSheet } from "react-native";
import { size } from "../../constants/variables";
import {
  retrieveDataFromTheFileSystem,
  saveDataToFileSystem,
} from "../../services/DataService";
import { useData } from "../../context/dataContext";

interface EditSourceContainerProps {
  item: TSource;
  closeAll: () => void;
  setOnUpdatingSource: (onUpdatingSource: boolean) => void;
}

const EditSourceContainer: React.FC<EditSourceContainerProps> = ({
  item,
  setOnUpdatingSource,
  closeAll,
}) => {
  const { data, setData } = useData();

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
          onPress={() => deleteSource(item.docId)}
          style={styles.buttonContainer}
        >
          <AntDesign name="delete" size={24} color="#ff6347" />
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setOnUpdatingSource(true)} // DELETE SOURCE WHEN CLICKING THIS BUTTON
          style={styles.buttonContainer}
        >
          <Feather name="edit" size={24} color="#4682b4" />
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.buttonContainer} onPress={closeAll}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  editContainer: {
    width: size,
    padding: 8,
    gap: 5,
    height: size,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    backgroundColor: "#333", // Dark item background color
    borderRadius: 5,
  },
  row: {
    flexDirection: "row",
    // backgroundColor: "#333", // Dark item background color
    // gap: 5,
    height: "50%",
    width: "100%",
    // alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    // height: "50%",
    backgroundColor: "#282828",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
  },
});

export default EditSourceContainer;
