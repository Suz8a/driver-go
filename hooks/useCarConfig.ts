import { useCallback, useEffect, useState } from "react";
import {useAsyncStorage} from "./useAsyncStorage";

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

export type ConfigID = "gpsNumber" | "start" | "stop" | "alarmOn" | "alarmOff";

export default function useCarConfig() {
  const [storedCarConfig, setStoredCarConfig] = useAsyncStorage(
    "carConfig",
    ""
  );
  const [commands] = useAsyncStorage("commands", "");
  const [gpsNumber] = useAsyncStorage("gpsNumber", "");
  const [carConfig, setCarConfig] = useState<CarConfig>({
    gpsNumber: "",
    commands: {
      start: {
        command: "",
        successMessage: "Engine Started",
      },
      stop: {
        command: "",
        successMessage: "Engine Stopped",
      },
      alarmOn: {
        command: "",
        successMessage: "Alarm On",
      },
      alarmOff: {
        command: "",
        successMessage: "Alarm Off",
      },
    },
  });

  const changeCarConfig = useCallback(
    (configId: ConfigID, value: string) => {
      const newCarConfig =
        configId === "gpsNumber"
          ? {
              ...carConfig,
              gpsNumber: value,
            }
          : {
              ...carConfig,
              commands: {
                ...carConfig.commands,
                [configId]: value,
              },
            };

      if (configId === "gpsNumber") {
        setStoredCarConfig(newCarConfig);
      } else {
        setStoredCarConfig(newCarConfig);
      }
    },
    [setStoredCarConfig]
  );

  useEffect(() => {
    if (storedCarConfig) setCarConfig(storedCarConfig);
  }, [storedCarConfig]);

  useEffect(() => {
    if (commands && gpsNumber){
      const currentConfig = {
        gpsNumber: gpsNumber,
        commands: {
          start: {
            command: commands.startEngine,
            successMessage: "Engine Started",
          },
          stop: {
            command: commands.stopEngine,
            successMessage: "Engine Stopped",
          },
          alarmOn: {
            command: commands.alarmOn,
            successMessage: "Alarm On",
          },
          alarmOff: {
            command: commands.alarmOff,
            successMessage: "Alarm Off",
          },
        },
      }
      setCarConfig(currentConfig)
    }
  }, [commands,gpsNumber]);

  return {
    carConfig,
    changeCarConfig,
  };
}
