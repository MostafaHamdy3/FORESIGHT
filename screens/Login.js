import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Input from "../components/Input";
import Button from "../components/Button";
import { Colors } from "../constants/config";
import { verifyLogIn } from "../store/actions/Authentication";
import DotPulse from "../components/DotPluse";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("abdo@foresight.com");
  const [password, setPassword] = useState("123456aA@");
  const [isRemember, setIsRemember] = useState(false);
  const [isSecure, setIsSecure] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const signInFailed = useSelector((state) => state.auth.signInFailed);

  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     try {
  //       const isRememberMe = await AsyncStorage.getItem("isRemember");
  //       const token = await AsyncStorage.getItem("authToken");
  //       if (isRememberMe === "true" && token) {
  //         navigation.replace("Manager");
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   checkLoginStatus();
  // }, []);

  const toggleCheckbox = () => {
    setIsRemember(!isRemember);
  };

  const togglePasswordVisibility = () => {
    setIsSecure(!isSecure);
  };

  const loginHandler = async (email, password) => {
    try {
      setIsLoading(true)
      let authData = { email, password };
      let result = await dispatch(verifyLogIn(authData, isRemember));
      if (result === "ADMIN") navigation.replace("Manager");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  console.log("SignIn:", signInFailed)

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={{ alignItems: "center" }}>
        <Image source={require("../assets/mark.png")} style={styles.logo} />
      </View>

      <View style={{ alignItems: "center" }}>
        <Text style={styles.welcomeTitle}>Welcome back!</Text>
        <Text style={styles.title}>Please enter your details</Text>
      </View>

      <View style={styles.inputField}>
        <Input
          label="Email Address"
          // onUpdateValue={updateInputValueHandler.bind(this, 'email')}
          value={email}
          onUpdateValue={(text) => setEmail(text)}
          keyboardType="email-address"
        />
        <Input
          label="Password"
          secure={isSecure}
          value={password}
          onUpdateValue={(text) => setPassword(text)}
          rightIcon={
            isSecure
              ? require("../assets/visibility_off.png")
              : require("../assets/visibility_on.png")
          }
          onPressRightIcon={togglePasswordVisibility}
          // onUpdateValue={updateInputValueHandler.bind(this, 'password')}
        />
        {signInFailed && (
          <Text style={styles.validation}>Email or password are wrong!</Text>
        )}
      </View>

      <View style={styles.checkedContent}>
        <TouchableOpacity onPress={toggleCheckbox}>
          <Ionicons
            name={isRemember ? "checkbox" : "square-outline"}
            size={20}
            color={isRemember ? Colors.primary : Colors.grey}
            style={{ marginRight: 4 }}
          />
        </TouchableOpacity>
        <Text>Remember me</Text>
      </View>

      <View style={{ width: "35%", alignSelf: "center" }}>
        <Button
          onPress={() => loginHandler(email, password)}
          backgroundColor={ email === "" || password === "" ? Colors.dammed : Colors.primary}
          disabled={email === "" || password === ""}
        >
          {isLoading ? <DotPulse /> : "Log In"}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "92%",
    alignSelf: "center",
  },
  logo: {
    width: 100,
    height: 75,
    marginTop: 108,
    marginBottom: 12,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 2,
  },
  title: {
    fontSize: 12,
    color: Colors.grey,
  },
  inputField: {
    width: "100%",
    alignSelf: "center",
    marginTop: 32,
  },
  checkedContent: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 42,
  },
  validation: {
    color: Colors.error,
    marginVertical: 6,
    marginLeft: 4,
    fontSize: 12,
  },
});

export default Login;
