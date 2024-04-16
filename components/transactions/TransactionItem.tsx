import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Transaction } from "../../constants/types";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  PanResponder,
} from "react-native";
import { useRef, useState } from "react";

interface TransactionProps {
  item: Transaction;
}
const buttonWidth: number = 120;

const TransactionItem: React.FC<TransactionProps> = ({ item }) => {
  const translateX = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // Allow movement only to the left up to the negative button width
        const newTranslation = Math.max(gestureState.dx, -buttonWidth);
        if (newTranslation < 0) {
          translateX.setValue(newTranslation);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        // Define the threshold to trigger the full reveal of buttons
        const swipeThreshold = -buttonWidth / 2; // Half the width of the buttons
        const finalPosition =
          gestureState.dx < swipeThreshold ? -buttonWidth : 0;

        // Animate to the final position based on the swipe distance
        Animated.spring(translateX, {
          toValue: finalPosition,
          useNativeDriver: true,
          bounciness: 0, // Reduce bounciness to make the snap feel more decisive
        }).start();
      },
    })
  ).current;

  return (
    <View {...panResponder.panHandlers}>
      <Animated.View
        style={[styles.transactionItem, { transform: [{ translateX }] }]}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Text
          style={[
            styles.amount,
            item.type === "income" ? styles.income : styles.expense,
          ]}
        >
          {item.amount}
        </Text>
      </Animated.View>
      <View style={styles.buttonsBox}>
        <TouchableOpacity style={[styles.button, styles.edit]}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.delete]}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  transactionItem: {
    position: "relative",
    gap: 10,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
    backgroundColor: "#333", // Dark item background color
    borderRadius: 5,
    borderColor: "#333",
    borderWidth: 1,
  },
  title: {
    fontWeight: "normal",
    color: "#ffffff",
    fontSize: 15, // Adjusted from 1.3ch
  },
  amount: {
    fontSize: 16,
    fontWeight: "400",
  },
  income: {
    color: "#73D474",
  },
  expense: {
    color: "#F37267",
  },
  buttonsBox: {
    backgroundColor: "#6495ED",
    width: "90%",
    margin: 5,
    height: 37,
    borderRadius: 5,
    justifyContent: "flex-end",
    zIndex: -1,
    right: 0,
    position: "absolute",
    flexDirection: "row",
  },
  button: {
    justifyContent: "center",
    padding: 3,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: "#D3D3D3",
  },
  edit: {
    backgroundColor: "#6495ED",
  },
  delete: {
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: "#F37267",
  },
});

export default TransactionItem;
