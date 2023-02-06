import { useEffect } from "react";
import { Alert, StyleSheet, ToastAndroid, View } from "react-native";
import { Button, FormInput, moveToBottom, useFormInput } from "../components";
import { useAsyncStorage } from "../hooks/useAsyncStorage";
import { SettingsStackScreenProps } from "../types";

export function EditName({ navigation }: SettingsStackScreenProps<"Settings">) {
  const { onChangeText, value } = useFormInput();
  const [profileName, setProfileName] = useAsyncStorage("profileName", "");

  const onSave = () => {
    Alert.alert("Confirm", "Change profile name?", [
      {
        text: "Cancel",
      },
      {
        text: "OK",
        onPress: () => {
          if (value !== profileName) setProfileName(value);
          ToastAndroid.show("Profile name updated", ToastAndroid.SHORT);
        },
      },
    ]);
  };

  const onCancel = () => {
    navigation.navigate("Settings");
  };

  useEffect(() => {
    if (profileName) {
      onChangeText(profileName);
    }
  }, [profileName]);

  return (
    <View style={styles.container}>
      <FormInput
        autoFocus
        placeholder="Profile name"
        onChangeText={onChangeText}
        value={value}
      />

      {moveToBottom(
        <View style={styles.buttonsContainer}>
          <Button variant="outlined" onPress={onCancel}>
            Cancel
          </Button>
          <Button style={{ marginLeft: 20 }} onPress={onSave}>
            Save
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f6f6f6",
    paddingTop: 20,
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
});
