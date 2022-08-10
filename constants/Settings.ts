export type IconProps = {
  name: string;
  size: number;
  color: string;
};

// Use MaterialCommunityIcons

export type Settings = {
  title: string;
  route: string;
  iconProps: IconProps;
};

export const settings: Settings[] = [
  {
    title: "Name",
    route: "EditProfileName",
    iconProps: {
      name: "account-circle",
      size: 30,
      color: "#5F6267",
    },
  },
  {
    title: "GPS number",
    route: "EditGPSNumber",
    iconProps: {
      name: "cellphone",
      size: 30,
      color: "#5F6267",
    },
  },
  {
    title: "Commands",
    route: "EditCommands",
    iconProps: {
      name: "shield-key",
      size: 30,
      color: "#5F6267",
    },
  },
];
