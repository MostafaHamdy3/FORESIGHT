import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { Colors } from "../constants/config"

function Input(props) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, props.isInvalid && styles.labelInvalid]}>
        {props.label}
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={[styles.input, props.isInvalid && styles.inputInvalid]}
          autoCapitalize="none"
          keyboardType={props.keyboardType}
          secureTextEntry={props.secure}
          value={props.value}
          onChangeText={props.onUpdateValue}
        />
        {props.rightIcon && (
          <View style={styles.iconView}>
            <TouchableOpacity onPress={props.onPressRightIcon}>
              <Image 
                source={props.rightIcon}
                style={{width: 24, height: 24}}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8
  },
  label: {
    color: Colors.black,
    marginBottom: 4,
  },
  labelInvalid: {
    color: Colors.error,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    backgroundColor: Colors.white,
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    color: Colors.black,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  inputInvalid: {
    backgroundColor: Colors.error,
  },
  iconView: {
    position: "absolute",
    top: 12,
    right: 20,
    zIndex: 90,
  }
});