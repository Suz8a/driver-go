import React, { ReactNode } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

export type RoundedButtonProps = {
  onPress: () => void;
  children: ReactNode;
};

export default function RoundedButton({
  onPress,
  children,
}: RoundedButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 200,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    borderRadius: 200,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 25,
  },
});
