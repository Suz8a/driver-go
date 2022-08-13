/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      Home: "home",
      SettingsStackNavigator: {
        screens: {
          Settings: "settings",
          Name: "name",
          GPSNumber: "gpsNumber",
          Commands: "commands",
        },
      },
      NotFound: "*",
    },
  },
};

export default linking;
