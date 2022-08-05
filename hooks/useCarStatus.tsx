import { ReactNode, useCallback, useEffect, useState } from "react";
import useAsyncStorage from "./useAsyncStorage";
import Icon from "react-native-vector-icons/Fontisto";

export type CommandStatus = {
  active: boolean;
  iconProps: {
    name: string;
    size: number;
    color: string;
  };
};

export type CarStatus = {
  engine: CommandStatus;
  alarm: CommandStatus;
};

export default function useCarStatus() {
  const [storedCarStatus, setStoredCarStatus] = useAsyncStorage(
    "carStatus",
    ""
  );
  const [carStatus, setCarStatus] = useState<CarStatus>({
    engine: {
      active: true,
      iconProps: {
        name: "power",
        size: 70,
        color: "green",
      },
    },
    alarm: {
      active: true,
      iconProps: {
        name: "unlocked",
        size: 70,
        color: "green",
      },
    },
  });

  const switchEngine = useCallback(() => {
    const engineSwitchedIsActive = !carStatus.engine.active;

    setStoredCarStatus &&
      setStoredCarStatus(
        JSON.stringify({
          ...carStatus,
          engine: {
            active: engineSwitchedIsActive,
            iconProps: {
              name: "power",
              size: 70,
              color: engineSwitchedIsActive ? "green" : "red",
            },
          },
        })
      );
  }, []);

  const switchAlarm = useCallback(() => {
    const alarmSwitchedIsActive = !carStatus.alarm.active;

    setStoredCarStatus &&
      setStoredCarStatus(
        JSON.stringify({
          ...carStatus,
          alarm: {
            active: alarmSwitchedIsActive,
            iconProps: {
              name: alarmSwitchedIsActive ? "unlocked" : "locked",
              size: 70,
              color: alarmSwitchedIsActive ? "green" : "red",
            },
          },
        })
      );
  }, []);

  useEffect(() => {
    if (storedCarStatus) setCarStatus(JSON.parse(storedCarStatus as any));
  }, [storedCarStatus]);

  return {
    carStatus,
    switchAlarm,
    switchEngine,
  };
}
