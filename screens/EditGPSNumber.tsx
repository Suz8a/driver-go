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

export function EditGPSNumber() {
  const { onChangeText, value } = useFormInput();
  const [gpsNumber, setGpsNumber] = useAsyncStorage("gpsNumber", "");
  const [editEnabled, setEditEnabled] = useState(false);

  const onSave = () => {
    Alert.alert("Confirm", "Change GPS number?", [
      {
        text: "Cancel",
      },
      {
        text: "OK",
        onPress: () => {
          if (value !== gpsNumber) setGpsNumber(value.trim());
          setEditEnabled(false);
          ToastAndroid.show("GPS number updated", ToastAndroid.SHORT);
        },
      },
    ]);
  };

  const onCancel = () => {
    setEditEnabled(false);
  };

  useEffect(() => {
    if (gpsNumber) {
      onChangeText(gpsNumber);
    }
  }, [gpsNumber]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <FormInput
          secureTextEntry={!editEnabled}
          editable={editEnabled}
          placeholder="GPS number"
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
