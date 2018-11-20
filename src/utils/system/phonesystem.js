import { Platform } from "react-native";

const ISIOS = Platform.OS === "ios";
const ISANDROID = Platform.OS === "android";

export { ISIOS, ISANDROID, Platform };
