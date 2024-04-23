// Library
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";

// Context
import { useModalType } from "../context/modalContext";

// Components
import { Text, View } from "../components/Themed";
import AddSourceForm from "../components/modals/AddSourceForm";
import AddTransactionForm from "../components/modals/AddTransactionForm";

export default function ModalScreen() {
  const { modalType } = useModalType();

  // Return navigation func
  const goback: () => void = () => {
    router.back();
  };

  // Display different views depending on modalType
  switch (modalType) {
    case "add-source": {
      return <AddSourceForm />;
    }
    case "add-income": {
      return <AddTransactionForm transactionType="income" />;
    }
    case "add-expense": {
      return <AddTransactionForm transactionType="expense" />;
    }
    default:
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Welcome to Pay Smart!</Text>
          <Text style={styles.text}>
            This application helps you track your expenses, income, and other
            transactions efficiently. It is designed for quick daily use,
            requiring only 4-5 minutes to provide a clear understanding of your
            spending habits, including indirect expenses such as subscriptions
            and cash payments.
          </Text>

          <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
          <TouchableOpacity style={styles.button} onPress={goback}>
            <Text>Go Back</Text>
          </TouchableOpacity>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 20,
    marginVertical: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    color: "#d6d6d6",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#333",
    borderColor: "#707070",
    marginVertical: 10,
    gap: 5,
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
});
