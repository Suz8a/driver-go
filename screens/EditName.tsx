import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, ToastAndroid, View } from "react-native";
import { Button, FormInput, moveToBottom, useFormInput } from "../components";
import { useAsyncStorage } from "../hooks/useAsyncStorage";

export function EditName() {
  const { onChangeText, value } = useFormInput();
  const [profileName, setProfileName] = useAsyncStorage("profileName", "");
  const [editEnabled, setEditEnabled] = useState(false);

  const onSave = () => {
    if (value !== profileName) setProfileName(value.trim());
    setEditEnabled(false);
    ToastAndroid.show("Nombre de perfil actualizado", ToastAndroid.SHORT);
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
          placeholder="Nombre de perfil"
          onChangeText={onChangeText}
          value={value}
        />
      </ScrollView>

      {moveToBottom(
        <View style={styles.buttonsContainer}>
          {!editEnabled ? (
            <Button onPress={() => setEditEnabled(true)}>Editar</Button>
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
