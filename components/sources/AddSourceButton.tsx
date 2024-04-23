// Library
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

// Context
import { useModalType } from "../../context/modalContext";

// Variables
import { size } from "../../constants/variables";

const AddSourceButton: React.FC = () => {
  const { setModalType } = useModalType();
  return (
    <Link href="/modal" asChild>
      <TouchableOpacity
        style={styles.sourceItem}
        onPress={() => setModalType("add-source")}
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
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: "#707070",
  },
  sourceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#B2BEB5",
  },
});

export default AddSourceButton;
