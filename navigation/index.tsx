import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable, View } from "react-native";

import {NotFoundScreen} from "../screens/NotFoundScreen";
import {Home} from "../screens/Home";
import {Settings} from "../screens/Settings";
import {
  RootStackParamList,
  RootStackScreenProps,
  SettingsStackParamList,
  SettingsStackScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import Icon from "react-native-vector-icons/Ionicons";
// import EditName from "../screens/Name";

const settingsIcon = <Icon name="settings-sharp" size={25} color="white" />;
const arrowLeftIcon = <Icon name="ios-arrow-back" size={25} color="white" />;

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const RootStack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <RootStack.Navigator screenOptions={{animation:'fade'}} >
      <RootStack.Screen
        name="Home"
        component={Home}
        options={({ navigation }: RootStackScreenProps<"Home">) => ({
          title: "Home",
          headerRight: () => (
            <Pressable
              onPress={() => navigation.push("SettingsStackNavigator")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <View style={{ marginRight: 15 }}>{settingsIcon}</View>
            </Pressable>
          ),
        })}
      />
      <RootStack.Screen
        name="SettingsStackNavigator"
        component={SettingsStackNavigator}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </RootStack.Navigator>
  );
}

const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();

function SettingsStackNavigator() {
  return (
    <SettingsStack.Navigator initialRouteName="Settings">
      <SettingsStack.Screen
        name="Settings"
        component={Settings}
        options={({ navigation }: SettingsStackScreenProps<"Settings">) => ({
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.navigate("Home");
              }}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <View style={{ marginRight: 10 }}>{arrowLeftIcon}</View>
            </Pressable>
          ),
        })}
      />
      {/* <SettingsStack.Screen name="EditName" component={EditName} /> */}
      <SettingsStack.Screen name="EditGPSNumber" component={Home} />
      <SettingsStack.Screen name="EditCommands" component={Home} />
    </SettingsStack.Navigator>
  );
}
