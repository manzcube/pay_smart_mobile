// Library
import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

// Types and Variables
import { TSource, SourcesListType, DropDownProps } from "../../constants/types";

const DropDown: React.FC<DropDownProps> = ({
  sources,
  selectedSource,
  setSelectedSource,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [filteredSources, setFilteredSources] = useState<SourcesListType>([]);

  useEffect(() => {
    // Filter out the "Button" title source
    const newSources = sources.filter((source) => source.title !== "Button");
    setFilteredSources(newSources);
  }, [sources]);

  // Handle picking a Source
  const pickSource: (source: TSource) => void = (source) => {
    setSelectedSource(source);
    setOpen(false);
  };

  return filteredSources.length ? (
    open ? (
      <View style={styles.sourcesList}>
        <Text style={styles.selectSource}>- Select a Source -</Text>
        {filteredSources.map((source: TSource) => (
          <TouchableOpacity
            key={source.docId} // Ensure to use a unique key for each item
            style={styles.textContainer}
            onPress={() => pickSource(source)}
          >
            <Text style={styles.text}>{source.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    ) : (
      <TouchableOpacity onPress={() => setOpen(true)} style={styles.container}>
        <Text style={styles.text}>{selectedSource.title}</Text>
      </TouchableOpacity>
    )
  ) : (
    <Text style={styles.text}>No Sources Yet</Text>
  );
};

const styles = StyleSheet.create({
  container: {
    color: "#fff",
    borderRadius: 5,
    justifyContent: "center",
    height: 50,
    backgroundColor: "#333",
    padding: 10,
    marginVertical: 8,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: "#707070",
  },
  sourcesList: {
    color: "#fff",
    borderRadius: 5,
    backgroundColor: "#333",
    padding: 8,
    marginVertical: 8,
    width: "100%",
  },
  textContainer: {
    backgroundColor: "#5a5a5a",
    borderRadius: 5,
    marginVertical: 3,
    padding: 15,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: "#999",
  },
  text: {
    color: "white",
  },
  selectSource: {
    color: "#fff",
    justifyContent: "center",
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: "#333",
    marginVertical: 8,
  },
});

export default DropDown;
