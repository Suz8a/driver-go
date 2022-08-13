import {
  CompositeScreenProps,
  NavigatorScreenParams,
  CompositeNavigationProp,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

// Param Lists

export type RootStackParamList = {
  SettingsStackNavigator:
    | NavigatorScreenParams<SettingsStackParamList>
    | undefined;
  Home: undefined;
  NotFound: undefined;
};

export type SettingsStackParamList = {
  Settings: undefined;
  Name: undefined;
  GPSNumber: undefined;
  Commands: undefined;
};

// Screen Props

export type RootStackScreenProps<TScreen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, TScreen>;

export type SettingsStackScreenProps<
  TScreen extends keyof SettingsStackParamList
> = CompositeScreenProps<
  NativeStackScreenProps<SettingsStackParamList, TScreen>,
  RootStackScreenProps<"Home">
>;
