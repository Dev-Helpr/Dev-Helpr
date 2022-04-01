import * as types from './../constants/actionTypes.js';


export const userSignup = (e) => ({
  type: types.SIGN_UP,
  payload: e.target.value,
});
