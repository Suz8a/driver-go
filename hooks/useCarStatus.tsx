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

// TODO: add no data error management
export function useCarStatus() {
  const [storedCarStatus, setStoredCarStatus] = useAsyncStorage(
    "carStatus",
    ""
  );
  const [gpsNumber] = useAsyncStorage("gpsNumber", "");
  const [commands] = useAsyncStorage("commands", "");
  const [currentGpsNumber, setCurrentGpsNumber] = useState<string | undefined>(
    undefined
  );
  const [currentCommands, setCurrentCommands] = useState<Commands | undefined>(
    undefined
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

    sendSMS(
      engineSwitchedIsActive
        ? currentCommands?.stopEngine
        : currentCommands?.startEngine,
      currentGpsNumber,
      getSuccessMsg("engine", engineSwitchedIsActive)
    );

    setStoredCarStatus(newStatusData);
  }, [setStoredCarStatus, carStatus]);

  // TODO: send on/off alarm SMS based on localStorage data
  const switchAlarm = useCallback(() => {
    const alarmSwitchedIsActive = !carStatus.alarm.active;
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

    sendSMS(
      alarmSwitchedIsActive
        ? currentCommands?.alarmOff
        : currentCommands?.alarmOn,
      currentGpsNumber,
      getSuccessMsg("alarm", alarmSwitchedIsActive)
    );

    setStoredCarStatus(newStatusData);
  }, [setStoredCarStatus, carStatus]);

  useEffect(() => {
    if (storedCarStatus) setCarStatus(storedCarStatus);
  }, [storedCarStatus]);

  useEffect(() => {
    setCurrentGpsNumber(gpsNumber);
  }, [gpsNumber]);

  useEffect(() => {
    setCurrentCommands(commands);
  }, [commands]);

  return {
    carStatus,
    switchAlarm,
    switchEngine,
  };
}
