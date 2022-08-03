import { useCallback, useEffect, useState } from "react";
import useAsyncStorage from "./useAsyncStorage";
import Icon from "react-native-vector-icons/Fontisto";

export type Command = {
  command: string;
  successMessage: string;
};

export type Commands = {
  start: Command;
  stop: Command;
  alarmOn: Command;
  alarmOff: Command;
};

export type CarConfig = {
  gpsNumber: string;
  commands: Commands;
};

export default function useCarConfig() {
  const [storedCarConfig, setStoredCarConfig] = useAsyncStorage(
    "carConfig",
    ""
  );
  const [carConfig, setCarConfig] = useState<CarConfig>({
    gpsNumber: "-",
    commands: {
      start: {
        command: "resume123456",
        successMessage: "Engine Started",
      },
      stop: {
        command: "stop123456",
        successMessage: "Engine Stopped",
      },
      alarmOn: {
        command: "arm123456",
        successMessage: "Alarm On",
      },
      alarmOff: {
        command: "disarm123456",
        successMessage: "Alarm Off",
      },
    },
  });

  return null;
}
