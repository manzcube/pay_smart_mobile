import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const numColumns = 2; // You can change this number based on how many squares you want per row
export const size = (width - 30) / numColumns; // 10 for padding and 20 for margins
