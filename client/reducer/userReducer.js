import * as types from './../constant/actionTypes.js';

const initialUserState = {
  username: '',
  email: '',
  password: '',
  isOnline: false,
  ishelper: false,
}

const userStateReducer = (state = initialUserState, action) => {

  switch (action.type) {

    case types.SIGN_UP: {
      return state;
    }

    case types.LOG_IN: {
      return {
        ...state,
        [action.payload[0]]: action.payload[1],
      }
    }

    default: {
      return state;
    }
  }
}

export default userStateReducer;