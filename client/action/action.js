import * as types from './../constant/actionTypes.js';


export const userSignup = (e) => ({
  type: types.SIGN_UP,
  payload: e.target.value,
});

export const userLogin = (e) => ({
  type: types.LOG_IN,
  payload: [e.target.name, e.target.value],
});