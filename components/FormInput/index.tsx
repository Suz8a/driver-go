import {
  TextInput,
  View,
  StyleSheet,
  Dimensions,
  TextInputProps,
} from "react-native";
import { Text } from "../Themed";

export type FormInputProps = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  autoFocus?: boolean;
} & TextInputProps;

const windowWidth = Dimensions.get("window").width;

export function FormInput({
  placeholder,
  onChangeText,
  value,
  autoFocus,
  ...props
}: FormInputProps) {
  return (
    <View style={styles.container}>
      <View style={styles.inputTitleContainer}>
        <Text style={styles.inputTitle}>{placeholder}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          autoFocus={autoFocus}
          {...props}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  inputTitleContainer: {
    marginLeft: 10,
  },
  inputTitle: {
    color: "#8C8D8B",
    fontSize: 16,
    fontWeight: "500",
  },
  inputContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    color: "#343539",
    marginLeft: 10,
  },
  InputContainer: {
    marginHorizontal: 10,
    borderRadius: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    padding: 10,
    height: 40,
    fontSize: 16,
  },
});
