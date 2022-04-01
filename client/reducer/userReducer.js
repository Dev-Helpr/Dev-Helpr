import * as types from './../constant/actionTypes.js';

const initialUserState = {
  username: '',
  email: '',
  password: '',
}

const userStateReducer = (state = initialUserState, action) => {

  switch (action.type) {
    case types.SIGN_UP: {
      
    }
  }
}

export default userStateReducer;