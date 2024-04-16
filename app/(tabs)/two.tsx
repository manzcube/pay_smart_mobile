import { StyleSheet } from "react-native";
import { View } from "../../components/Themed";
import SourcesList from "../../components/sources/SourcesList";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <SourcesList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});
