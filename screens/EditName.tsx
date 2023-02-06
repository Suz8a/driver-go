import { StyleSheet, View } from "react-native";
import { Button, FormInput, moveToBottom, useFormInput } from "../components";

export function EditName() {
  const { onChangeText, value } = useFormInput();

  return (
    <View style={styles.container}>
      <FormInput
        placeholder="Profile name"
        onChangeText={onChangeText}
        value={value}
      />

      {moveToBottom(
        <View style={styles.buttonsContainer}>
          <Button variant="outlined" onPress={() => {}}>
            Cancel
          </Button>
          <Button style={{ marginLeft: 20 }} onPress={() => {}}>
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
