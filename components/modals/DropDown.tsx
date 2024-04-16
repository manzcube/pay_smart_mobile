import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { TSource, SourcesListType } from "../../constants/types";

interface DropDownProps {
  sources: SourcesListType;
  selectedSource: TSource;
  setSelectedSource: (source: TSource) => void;
}

const { width } = Dimensions.get("window");
const numColumns = 2;
const size = (width - 50) / numColumns;

const DropDown: React.FC<DropDownProps> = ({
  sources,
  selectedSource,
  setSelectedSource,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  // Use useEffect to filter out the 'Button' title source from the list
  const [filteredSources, setFilteredSources] = useState<SourcesListType>([]);

  useEffect(() => {
    const newSources = sources.filter((source) => source.title !== "Button");
    setFilteredSources(newSources);
  }, [sources]);

  const pickSource: (source: TSource) => void = (source) => {
    setSelectedSource(source);
    setOpen(false);
  };

  return filteredSources.length ? (
    open ? (
      <View style={styles.sourcesList}>
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
    padding: 10,
  },
  text: {
    color: "white",
  },
});

export default DropDown;
