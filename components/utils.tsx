import { ReactNode } from "react";
import { View, StyleSheet } from "react-native";

export function moveToBottom(component: ReactNode) {
  return <View style={styles.container}>{component}</View>;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 25,
  },
});
