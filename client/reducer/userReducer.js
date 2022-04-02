import * as types from './../constant/actionTypes.js';

const initialUserState = {
  username: '',
  email: '',
  password: '',
  isOnline: false,
  status: '',
}

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
        ...state,
        [action.payload[0]]: action.payload[1],
      };
    }

    default: {
      return state;
    }
  }
}

export default userStateReducer;