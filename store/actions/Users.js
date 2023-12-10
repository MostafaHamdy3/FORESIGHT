import axios from "axios";
import { GET_USERS } from "./actionTypes";

import { baseUrl } from "../../constants/config";

export const setUsers = payload => ({
  type: action.GET_USERS,
  payload,
});

export const getUsers = async () => async (dispatch, getState) => {
  try {
    dispatch(setUsers([]));
    const response = await axios.get(`${baseUrl}/users`);
    dispatch(setUsers(response.data || []));
  } catch (error) {
    console.log("getUsers ERROR ==>", err);
    // dispatch(fetchUsersFailure(error.message));
  }
  return null;
};

// export async function getUsers() {
//   try {
//     const response = await axios.get(`${baseUrl}/users`);
//     return response.data;
//   } catch (err) {
//     console.log("getUsers ERROR ==>", err);
//     return false;
//   }
// }

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