import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
} from "react-native";
import { Button, FormInput, moveToBottom, useFormInput } from "../components";
import { useAsyncStorage } from "../hooks/useAsyncStorage";

export function EditName() {
  const { onChangeText, value } = useFormInput();
  const [profileName, setProfileName] = useAsyncStorage("profileName", "");
  const [editEnabled, setEditEnabled] = useState(false);

  const onSave = () => {
    Alert.alert("Confirm", "Change profile name?", [
      {
        text: "Cancel",
      },
      {
        text: "OK",
        onPress: () => {
          if (value !== profileName) setProfileName(value.trim());
          setEditEnabled(false);
          ToastAndroid.show("Profile name updated", ToastAndroid.SHORT);
        },
      },
    ]);
  };

  const onCancel = () => {
    setEditEnabled(false);
  };

  useEffect(() => {
    if (profileName) {
      onChangeText(profileName);
    }
  }, [profileName]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <FormInput
          editable={editEnabled}
          placeholder="Profile name"
          onChangeText={onChangeText}
          value={value}
        />
      </ScrollView>

      {moveToBottom(
        <View style={styles.buttonsContainer}>
          {!editEnabled ? (
            <Button onPress={() => setEditEnabled(true)}>Edit</Button>
          ) : (
            <>
              <Button variant="outlined" onPress={onCancel}>
                Cancel
              </Button>
              <Button style={{ marginLeft: 20 }} onPress={onSave}>
                Save
              </Button>
            </>
          )}
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
