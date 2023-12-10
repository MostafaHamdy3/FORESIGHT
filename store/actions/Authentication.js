import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as actions from "./actionTypes";

import { baseUrl } from "../../constants/config";

export const verifyLogIn = (authData, isRememberMe) => async dispatch => {
  try {
    const response = await axios.post(`${baseUrl}/login`, authData)
    console.log("Response:", response)
    const token = response.data.token;
    AsyncStorage.setItem("authToken", token);
    AsyncStorage.setItem("isRemember", isRememberMe.toString());
    return response.data.role;
  } catch (error) {
    if (error.response.data.code === 5) {
      dispatch(signInFailed(true));
    }
  } finally {
  }
};

const signInFailed = payload => {
  return {
    type: actions.SIGNIN_FAILED,
    payload,
  }
}