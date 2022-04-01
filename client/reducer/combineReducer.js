import { combineReducers } from "redux";
import userStateReducer from './userReducer.js';

const reducers = combineReducers({
  users: userStateReducer,
});


export default reducers;