import * as types from "./../constant/actionTypes.js";

export const userInput = (e) => ({
  type: types.USER_INPUT,
  payload: [e.target.name, e.target.value],
});

export const userLogin = (object) => ({
  type: types.LOG_IN,
  payload: object,
});

export const clearUserInput = () => ({
  type: types.CLEAR_INPUT,
  payload: null,
});


//for ticket reducer

export const ticketCreator = (e) => ({
  type: types.CREATE_TICKET,
  payload: [e.target.name, e.target.value],
});

export const updateTicketUrgency = (e) => ({
  type: types.TICKET_URGENCY,
  payload: e ? [e.target.name, e.target.value] : null,
});

