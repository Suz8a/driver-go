import { Alert, ToastAndroid } from "react-native";
import { useAsyncStorage } from "./useAsyncStorage";
import * as LocalAuthentication from "expo-local-authentication";
import { showNotification } from "../utils";

export const useAuth = () => {
  const [biometricsSupported, setBiometricsSupported] = useAsyncStorage(
    "biometricsSupported",
    ""
  );

  const askForPassword = (action: () => void) => {
    Alert.prompt("Ingrese su contraseña", undefined, (password) => {
      if (password === "yourpassword") {
        action();
      } else {
        showNotification("Autenticación con contraseña fallida");
      }
    });
  };

  const askForBiometrics = async (action: () => void) => {
    if (!biometricsSupported) {
      askForPassword(action);
      return;
    }

    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Autenticación necesaria",
      });

      if (result.success) {
        action();
      }
    } catch (error) {
      showNotification("Autenticación fallida");
    }
  };

  return {
    askForPassword,
    askForBiometrics,
  };
};
