import { 
  SIGNIN_FAILED,
} from "../actions/Authentication"

const initialState = {
  signInFailed: null,
};

const authReducer = (state = initialState, action) => {
  console.log("action: ", action)
  switch (action.type) {
    case SIGNIN_FAILED:
      return {
        ...state,
        signInFailed: action.payload
      }
    default: 
      return state;
  }
}

export default authReducer;