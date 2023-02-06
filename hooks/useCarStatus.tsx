import { useCallback, useEffect, useState } from "react";
import { useAsyncStorage } from "./useAsyncStorage";
import { IconProps } from "../constants/Settings";

export type CommandStatus = {
  active: boolean;
  iconProps: IconProps;
};

export type CarStatus = {
  engine: CommandStatus;
  alarm: CommandStatus;
};

export function useCarStatus() {
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
    const newStatusData = {
      ...carStatus,
      engine: {
        active: engineSwitchedIsActive,
        iconProps: {
          name: "power",
          size: 70,
          color: engineSwitchedIsActive ? "green" : "red",
        },
      },
    };

    setStoredCarStatus(newStatusData);
  }, [setStoredCarStatus, carStatus]);

  const switchAlarm = useCallback(() => {
    const alarmSwitchedIsActive = !carStatus.alarm.active;
    const newStatusData = {
      ...carStatus,
      alarm: {
        active: alarmSwitchedIsActive,
        iconProps: {
          name: alarmSwitchedIsActive ? "unlocked" : "locked",
          size: 70,
          color: alarmSwitchedIsActive ? "green" : "red",
        },
      },
    };

    setStoredCarStatus(newStatusData);
  }, [setStoredCarStatus, carStatus]);

  useEffect(() => {
    if (storedCarStatus) {
      setCarStatus(storedCarStatus);
    }
  }, [storedCarStatus]);

  return {
    carStatus,
    switchAlarm,
    switchEngine,
  };
}
