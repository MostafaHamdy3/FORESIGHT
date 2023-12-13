import axios from "axios";
import * as actions from "./actionTypes";
import { baseUrl } from "../../constants/config";

export const setUsers = payload => ({
  type: actions.GET_USERS,
  payload,
});

export const getUsers = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${baseUrl}/users`);
    dispatch(setUsers(response.data || []));
  } catch (error) {
    console.log("getUsers ERROR ==>", error);
  }
};

export async function addNewUser(userData) {
  try {
    const resp = await axios({
      method: "POST",
      url: baseUrl + "/users",
      data: userData,
    });
  } catch (err) {
    console.log("addUser ERROR ==>", err);
  }
}

export async function editUserDetails(id, newUserData) {
  try {
    console.log("User id: ", id);
    console.log("New user data: ", newUserData);
    const resp = await axios({
      method: "POST",
      url: `${baseUrl}/users/${id}`,
      data: newUserData,
    });
  } catch (err) {
    console.log("EditUser ERROR ==>", err);
  }
}