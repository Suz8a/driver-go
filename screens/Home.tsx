import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import RoundedButton from "../components/RoundedButton";
import Icon from "react-native-vector-icons/Fontisto";
import useCarStatus from "../hooks/useCarStatus";

export default function Home() {
  const {
    carStatus: {
      alarm: { iconProps: alarmIconProps },
      engine: { iconProps: engineIconProps },
    },
    switchAlarm,
    switchEngine,
  } = useCarStatus();

  return (
    <View style={styles.container}>
      <View>
        <RoundedButton onPress={switchEngine}>
          <Icon {...engineIconProps} />
        </RoundedButton>
        <RoundedButton onPress={switchAlarm}>
          <Icon {...alarmIconProps} />
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
