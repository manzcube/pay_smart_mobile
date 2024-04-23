// Library
import React from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { Text, View } from "../Themed";

// Constants
import { SourceItemProps } from "../../constants/types";
import { size } from "../../constants/variables";

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
    backgroundColor: "#333",
    borderRadius: 5,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: "#707070",
  },
  sourceTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#B2BEB5",
  },
  sourceAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default SourceItem;
