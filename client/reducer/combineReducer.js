import { combineReducers } from "redux";
import userStateReducer from './userReducer.js';

const reducers = combineReducers({
  signup: userStateReducer,
});


export default reducers;