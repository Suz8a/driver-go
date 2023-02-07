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

  return {
    carConfig,
    changeCarConfig,
  };
}
