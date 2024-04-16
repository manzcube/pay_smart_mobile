import React, { useEffect } from "react";
import { Text, StyleSheet, FlatList } from "react-native";

import { retrieveDataFromTheFileSystem } from "../../services/DataService";
import { useData } from "../../context/dataContext";
import Source from "./Source";
import AddSourceButton from "./AddSourceButton";

export default function SourcesList() {
  const { data } = useData();

  return data.sources.length ? (
    <FlatList
      data={data.sources}
      style={styles.container}
      keyExtractor={(item) => item.docId}
      renderItem={({ item }) =>
        item.title === "Button" ? <AddSourceButton /> : <Source item={item} />
      }
      numColumns={2} // Sets the number of columns for the grid
    />
  ) : (
    <Text style={styles.noSources}>No Sources Yet</Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#1A1A1A", // Dark background as per screenshot
  },
  noSources: {
    marginTop: "40%",
    fontSize: 16,
    color: "#B2BEB5",
    textAlign: "center",
  },
});
