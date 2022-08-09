import { StyleSheet, View } from "react-native";
import { Text } from "../components/Themed";

export default function Settings() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} />
      <Text style={styles.title}>Tab Two</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
