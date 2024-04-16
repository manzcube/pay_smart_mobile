import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

// Context
import { useModalType } from "../context/modalContext";
import { Pressable } from "react-native";

// Components
import { Text, View } from "../components/Themed";
import AddSourceForm from "../components/modals/AddSourceForm";

import { router } from "expo-router";
import AddTransactionForm from "../components/modals/AddTransactionForm";

export default function ModalScreen() {
  const { modalType } = useModalType();

  const goback: () => void = () => {
    router.back();
  };

  switch (modalType) {
    case "add-source-modal-type": {
      return <AddSourceForm />;
    }
    case "add-transaction-income": {
      return <AddTransactionForm transactionType="income" />;
    }
    case "add-transaction-expense": {
      return <AddTransactionForm transactionType="expense" />;
    }
    default:
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Modaddl</Text>
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />

          {/* Use a light status bar on iOS to account for the black space above the modal */}
          <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
          <Pressable onPress={goback}>
            <Text>Go BACKKKK</Text>
          </Pressable>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
