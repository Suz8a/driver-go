import { Alert, StyleSheet, ToastAndroid, View } from "react-native";
import { RoundedButton } from "../components/RoundedButton";
import Icon from "react-native-vector-icons/Fontisto";
import { useCarStatus } from "../hooks/useCarStatus";
import * as LocalAuthentication from "expo-local-authentication";
import { useEffect, useState } from "react";
import { useAsyncStorage } from "../hooks/useAsyncStorage";
import { useAuth } from "../hooks/useAuth";

export function Home() {
  const [biometricsSupported, setBiometricsSupported] = useAsyncStorage(
    "biometricsSupported",
    ""
  );
  const { askForBiometrics } = useAuth();
  const {
    carStatus: {
      alarm: { iconProps: alarmIconProps },
      engine: { iconProps: engineIconProps },
    },
    switchAlarm,
    switchEngine,
  } = useCarStatus();

  useEffect(() => {
    LocalAuthentication.hasHardwareAsync().then((supported) => {
      if (!biometricsSupported && supported) setBiometricsSupported(true);
    });
  }, []);

  return (
    <View style={styles.container}>
      <RoundedButton onPress={() => askForBiometrics(switchEngine)}>
        <Icon {...engineIconProps} />
      </RoundedButton>
      <RoundedButton onPress={() => askForBiometrics(switchAlarm)}>
        <Icon {...alarmIconProps} />
      </RoundedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6f6f6",
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
