import * as types from "./../constant/actionTypes.js";

export const userInput = (e) => ({
  type: types.USER_INPUT,
  payload: [e.target.name, e.target.value],
});

export const userLogin = (object) => ({
  type: types.LOG_IN,
  payload: object,
});
