import * as types from "../constants/actionTypes.js";

const initialUserState = {
  id: 0,
  userName: "",
  email: "",
  password: "",
  online: false,
  status: "",
  accessToken: "",
};

const userStateReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case types.USER_INPUT: {
      return {
        ...state,
        [action.payload[0]]: action.payload[1],
      };
    }

    case types.LOG_IN: {
      return {
        ...action.payload,
      };
    }

    case types.CLEAR_INPUT: {
      return {
        ...initialUserState,
      };
    }

    default: {
      return state;
    }
  }
};

export default userStateReducer;
