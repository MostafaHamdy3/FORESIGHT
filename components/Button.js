import {
  Pressable,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Colors } from "../constants/config";

function Button({ children, onPress, backgroundColor }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: backgroundColor }]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 6,
    paddingVertical: 8,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: "center",
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
