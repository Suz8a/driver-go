import { SettingsStackParamList } from "../types";

export type IconProps = {
  name: string;
  size: number;
  color: string;
};

// Use MaterialCommunityIcons

export type Settings = {
  title: string;
  route: keyof SettingsStackParamList;
  iconProps: IconProps;
};

export const settings: Settings[] = [
  {
    title: "Nombre",
    route: "EditName",
    iconProps: {
      name: "account-circle",
      size: 30,
      color: "#5F6267",
    },
  },
  {
    title: "GPS",
    route: "EditGPSNumber",
    iconProps: {
      name: "cellphone",
      size: 30,
      color: "#5F6267",
    },
  },
  {
    title: "Comandos",
    route: "EditCommands",
    iconProps: {
      name: "shield-key",
      size: 30,
      color: "#5F6267",
    },
  },
];
