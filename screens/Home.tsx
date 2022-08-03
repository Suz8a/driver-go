import { StyleSheet } from "react-native";

import { View } from "../components/Themed";
import RoundedButton from "../components/RoundedButton";
import Icon from "react-native-vector-icons/Fontisto";

export default function Home() {
  return (
    <View style={styles.container}>
      <View>
        <RoundedButton callback={() => {}}>
          <Icon name="power" size={70} color="black" />
        </RoundedButton>
        <RoundedButton callback={() => {}}>
          <Icon name="locked" size={70} color="black" />
        </RoundedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
