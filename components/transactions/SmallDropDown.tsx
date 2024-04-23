// Library
import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

// Constants
import {
  TSource,
  SourcesListType,
  SmallDropDownProps,
} from "../../constants/types";

const SmallDropDown: React.FC<SmallDropDownProps> = ({
  sources,
  selectedSource,
  setSelectedSource,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [filteredSources, setFilteredSources] = useState<SourcesListType>([]);

  useEffect(() => {
    // Use useEffect to filter out the 'Button' title source from the list
    const newSources = sources.filter((source) => source.title !== "Button");
    setFilteredSources(newSources);
  }, [sources]);

  // Handle picking a source
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
    backgroundColor: "#595959",
    padding: 10,
  },
  sourcesList: {
    color: "#fff",
    borderRadius: 5,
    backgroundColor: "#333",
    width: "100%",
  },
  textContainer: {
    backgroundColor: "#5a5a5a",
    borderRadius: 5,
    marginVertical: 3,
    padding: 10,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: "#999",
  },
  text: {
    color: "white",
  },
  selectSource: {
    color: "#c1c1c1",
    justifyContent: "center",
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: "#333",
    marginVertical: 8,
  },
});

export default SmallDropDown;
