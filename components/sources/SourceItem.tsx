import React from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { Text, View } from "../Themed";
import { TSource } from "../../constants/types";
import { size } from "../../constants/variables";

interface SourceItemProps {
  item: TSource;
  setOnEdit: (onEdit: boolean) => void;
}

const SourceItem: React.FC<SourceItemProps> = ({ item, setOnEdit }) => {
  return (
    <TouchableWithoutFeedback onLongPress={() => setOnEdit(true)}>
      <View style={styles.sourceItem}>
        <Text style={styles.sourceTitle}>{item.title}</Text>
        <Text style={styles.sourceAmount}>{item.amount}</Text>
      </View>
    </TouchableWithoutFeedback>
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
    backgroundColor: "#333", // Dark item background color
    borderRadius: 5,
  },
  sourceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#B2BEB5", // Text color for the source title
  },
  sourceAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff", // White color for amounts
  },
});

export default SourceItem;
