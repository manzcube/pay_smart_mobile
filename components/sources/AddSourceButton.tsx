import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useModalType } from "../../context/modalContext";

const { width } = Dimensions.get("window");
const numColumns = 2; // You can change this number based on how many squares you want per row
const size = (width - 30) / numColumns; // 10 for padding and 20 for margins

const AddSourceButton: React.FC = () => {
  const { setModalType } = useModalType();
  return (
    <Link href="/modal" asChild>
      <TouchableOpacity
        style={styles.sourceItem}
        onPress={() => setModalType("add-source-modal-type")}
      >
        <AntDesign
          name="addfolder"
          size={24}
          color="#B2BEB5"
          style={{ marginBottom: -3 }}
        />
        <Text style={styles.sourceTitle}>Add Source</Text>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  sourceItem: {
    width: size,
    gap: 10,
    height: size,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    backgroundColor: "#333",
    borderRadius: 5,
  },
  sourceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#B2BEB5",
  },
});

export default AddSourceButton;
