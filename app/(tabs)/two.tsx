// Library
import { StyleSheet } from "react-native";

// Components
import { View, Text } from "../../components/Themed";
import SourcesList from "../../components/sources/SourcesList";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <SourcesList />
      <Text style={styles.footerText}>Press and Hold on a Source to edit.</Text>
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
