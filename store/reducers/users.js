import { GET_USERS } from "../actions/actionTypes";

const initialState = {
  users: [],
  isLoading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload
      }
    default:
      return state;
  }
};

export default userReducer;
