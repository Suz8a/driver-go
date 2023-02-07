import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
} from "react-native";
import { Button, FormInput, useFormInput } from "../components";
import { useAsyncStorage } from "../hooks/useAsyncStorage";
import { useAuth } from "../hooks/useAuth";

export function EditCommands() {
  const startEngineInput = useFormInput();
  const stopEngineInput = useFormInput();
  const alarmOnInput = useFormInput();
  const alarmOffInput = useFormInput();
  const { askForBiometrics } = useAuth();
  const [commands, setCommands] = useAsyncStorage("commands", "");
  const [editEnabled, setEditEnabled] = useState(false);

  const onSave = () => {
    askForBiometrics(() => {
      updateCommands();
      setEditEnabled(false);
      ToastAndroid.show("Comandos actualizados", ToastAndroid.SHORT);
    });
  };

  const onEdit = () => {
    askForBiometrics(() => setEditEnabled(true));
  };

  const onCancel = () => {
    setEditEnabled(false);
  };

  const updateCommands = () => {
    setCommands({
      startEngine: startEngineInput.value || "",
      stopEngine: stopEngineInput.value || "",
      alarmOn: alarmOnInput.value || "",
      alarmOff: alarmOffInput.value || "",
    });
  };

  useEffect(() => {
    if (commands) {
      startEngineInput.onChangeText(commands.startEngine.trim());
      stopEngineInput.onChangeText(commands.stopEngine.trim());
      alarmOnInput.onChangeText(commands.alarmOn.trim());
      alarmOffInput.onChangeText(commands.alarmOff.trim());
    }
  }, [commands]);

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: 40 }}>
        <FormInput
          secureTextEntry={!editEnabled}
          editable={editEnabled}
          placeholder="Start Engine"
          onChangeText={startEngineInput.onChangeText}
          value={startEngineInput.value}
        />
        <FormInput
          secureTextEntry={!editEnabled}
          editable={editEnabled}
          placeholder="Stop Engine"
          onChangeText={stopEngineInput.onChangeText}
          value={stopEngineInput.value}
        />
        <FormInput
          secureTextEntry={!editEnabled}
          editable={editEnabled}
          placeholder="Alarm On"
          onChangeText={alarmOnInput.onChangeText}
          value={alarmOnInput.value}
        />
        <FormInput
          secureTextEntry={!editEnabled}
          editable={editEnabled}
          placeholder="Alarm Off"
          onChangeText={alarmOffInput.onChangeText}
          value={alarmOffInput.value}
        />
      </ScrollView>

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
    marginBottom: 25,
  },
});
