import { useCallback, useEffect, useState } from "react";
import { useAsyncStorage } from "./useAsyncStorage";
import { IconProps } from "../constants/Settings";
import { sendSMS } from "../utils";
import { Commands } from "../screens/EditCommands";

export type CommandStatus = {
  active: boolean;
  iconProps: IconProps;
};

export type CarStatus = {
  engine: CommandStatus;
  alarm: CommandStatus;
};

const commandDescription = {
  engine: {
    active: "Engine Started",
    inactive: "Engine Stopped",
  },
  alarm: {
    active: "Alarm On",
    inactive: "Alarm Off",
  },
};

function getSuccessMsg(type: "engine" | "alarm", active: boolean) {
  return commandDescription[type][active ? "active" : "inactive"];
}

export function useCarStatus() {
  const [storedCarStatus, setStoredCarStatus] = useAsyncStorage(
    "carStatus",
    ""
  );
  const [gpsNumber] = useAsyncStorage("gpsNumber", "");
  const [commands] = useAsyncStorage("commands", "");
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
    const newStatusData: CarStatus = {
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

    sendSMS({
      msg: engineSwitchedIsActive
        ? commands?.startEngine
        : commands?.stopEngine,
      tel: gpsNumber,
      successMsg: getSuccessMsg("engine", engineSwitchedIsActive),
      name: engineSwitchedIsActive ? "Start Engine" : "Stop Engine",
    });

    setStoredCarStatus(newStatusData);
  }, [setStoredCarStatus, carStatus]);

  const switchAlarm = useCallback(() => {
    const alarmSwitchedIsActive = !carStatus.alarm.active;

    sendSMS({
      msg: alarmSwitchedIsActive ? commands?.alarmOn : commands?.alarmOff,
      tel: gpsNumber,
      successMsg: getSuccessMsg("alarm", alarmSwitchedIsActive),
      name: alarmSwitchedIsActive ? "Alarm On" : "Alarm Off",
    });

    const newStatusData: CarStatus = {
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
    if (storedCarStatus) setCarStatus(storedCarStatus);
  }, [storedCarStatus]);

  return {
    carStatus,
    switchAlarm,
    switchEngine,
  };
}
