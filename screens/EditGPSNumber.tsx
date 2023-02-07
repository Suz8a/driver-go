import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, ToastAndroid, View } from "react-native";
import { Button, FormInput, moveToBottom, useFormInput } from "../components";
import { useAsyncStorage } from "../hooks/useAsyncStorage";
import { useAuth } from "../hooks/useAuth";

export function EditGPSNumber() {
  const { onChangeText, value } = useFormInput();
  const { askForBiometrics } = useAuth();
  const [gpsNumber, setGpsNumber] = useAsyncStorage("gpsNumber", "");
  const [editEnabled, setEditEnabled] = useState(false);

  const onSave = () => {
    askForBiometrics(() => {
      if (value !== gpsNumber) setGpsNumber(value.trim());
      setEditEnabled(false);
      ToastAndroid.show("GPS actualizado", ToastAndroid.SHORT);
    });
  };

  const onCancel = () => {
    setEditEnabled(false);
  };

  const onEdit = () => {
    askForBiometrics(() => setEditEnabled(true));
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
          placeholder="GPS"
          onChangeText={onChangeText}
          value={value}
        />
      </ScrollView>

      {moveToBottom(
        <View style={styles.buttonsContainer}>
          {!editEnabled ? (
            <Button onPress={onEdit}>Editar</Button>
          ) : (
            <>
              <Button variant="outlined" onPress={onCancel}>
                Cancelar
              </Button>
              <Button style={{ marginLeft: 20 }} onPress={onSave}>
                Guardar
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
