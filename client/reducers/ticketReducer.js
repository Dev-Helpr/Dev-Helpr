import * as types from "../constants/actionTypes.js";

const initialState = {
  problem: "",
  tried: "",
  expect: "",
  hypothesis: "",
  urgency: 1,
  inProgress: false,
  heading: "",
  brief: "",
  ready1: false,
  ready2: false,
  user_id: 0,
};

const ticketStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_TICKET: {
      return {
        ...state,
        [action.payload[0]]: action.payload[1],
      };
    }
    case types.TICKET_URGENCY: {
      if (action.payload === null) {
        return {
          ...state,
          urgency: 1,
        };
      }
      const strToNum = +action.payload[1];
      return {
        ...state,
        [action.payload[0]]: strToNum,
      };
    }

    case types.ClICK_EDIT: {
      return {
        ...state,
        ...action.payload,
      }
    }


    default: {
      return state;
    }
  }
};

export default ticketStateReducer;
