import { combineReducers } from "redux";
import userStateReducer from './userReducer.js';
import ticketStateReducer from "./ticketReducer.js";

const reducers = combineReducers({
  users: userStateReducer,
  tickets: ticketStateReducer,
});


export default reducers;