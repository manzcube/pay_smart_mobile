import { StyleSheet } from "react-native";
import { View, Text } from "../Themed";

export default function TabThreeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.footerText}>This page is for statistics.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  footerText: {
    position: "absolute",
    bottom: 12,
    textAlign: "center",
    width: "100%",
    fontSize: 12,
    color: "#adadad",
  },
});
