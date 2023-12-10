import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { baseUrl } from "../../constants/config";

export const verifyLogIn = (authData, isRememberMe) => async dispatch => {
  try {
    const response = await axios.post(`${baseUrl}/login`, authData)
    const token = response.data.token;
    AsyncStorage.setItem("authToken", token);
    AsyncStorage.setItem("isRemember", isRememberMe.toString());
    return response.data.role;
  } catch (error) {
    console.log("verifyLogIn ERROR ==>", error.response.status);
    if (error.response.status === 400) {
      dispatch(signInFailed('SIGNIN_INVALIED'));
    }
    return false;
  } finally {
  }
};

const signInFailed = payload => {
  return {
    type: actions.SIGNIN_FAILED,
    payload,
  }
}