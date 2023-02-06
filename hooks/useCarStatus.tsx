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

// TODO: add no data error management
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

  // TODO: send on/off engine SMS based on localStorage data
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

  // TODO: send on/off alarm SMS based on localStorage data
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
