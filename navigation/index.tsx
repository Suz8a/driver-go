import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable, View } from "react-native";

import NotFoundScreen from "../screens/NotFoundScreen";
import Home from "../screens/Home";
import Settings from "../screens/Settings";
import {
  RootStackParamList,
  RootStackScreenProps,
  SettingsTabParamList,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import Icon from "react-native-vector-icons/Ionicons";

const settingsIcon = <Icon name="settings-sharp" size={30} color="gray" />;
const arrowLeftIcon = <Icon name="ios-arrow-back" size={30} color="gray" />;

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

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }: RootStackScreenProps<"Home">) => ({
          title: "Home",
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("SettingsTabNavigator")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <View style={{ marginRight: 15 }}>{settingsIcon}</View>
            </Pressable>
          ),
        })}
      />
      <Stack.Screen
        name="SettingsTabNavigator"
        component={SettingsTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}

const SettingsTab = createNativeStackNavigator<SettingsTabParamList>();

function SettingsTabNavigator() {
  return (
    <SettingsTab.Navigator initialRouteName="Settings">
      <SettingsTab.Screen
        name="Settings"
        component={Settings}
        options={() => ({
          headerStyle: { backgroundColor: "#f6f6f6" },
          headerTitleStyle: {
            color: "black",
          },

          headerLeft: () => (
            <Pressable
              onPress={() => {}}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <View style={{ marginLeft: 10 }}>{arrowLeftIcon}</View>
            </Pressable>
          ),
        })}
      />
      <SettingsTab.Screen name="Name" component={Home} />
      <SettingsTab.Screen name="GPSNumber" component={Home} />
      <SettingsTab.Screen name="Commands" component={Home} />
    </SettingsTab.Navigator>
  );
}
