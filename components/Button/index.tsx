import { useMemo } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
} from "react-native";

export type ButtonProps = {
  onPress: () => void;
  children: string;
  style?: StyleProp<ViewStyle>;
  /** @default filled */
  variant?: "filled" | "outlined";
};

export function Button({
  onPress,
  children,
  variant = "filled",
  style: customStyle,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        customStyle,
        styles.button,
        variant === "filled" ? styles.filled : styles.outlined,
      ]}
      onPress={onPress}
    >
      <Text
        style={{
          ...styles.text,
          color: variant === "filled" ? "white" : "black",
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 200,
  },
  filled: {
    backgroundColor: "black",
  },
  outlined: {
    borderColor: "black",
    borderWidth: 1,
    color: "red",
  },
  text: {
    textAlign: "center",
    fontSize: 20,
  },
});
