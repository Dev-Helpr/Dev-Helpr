import * as types from "../constants/actionTypes.js";

const initialState = {
  problem: '',
  tried: '',
  expect: '',
  hypothesis: '',
  urgency: 1,
  inProgress: false,
  heading: '',
  brief: '',
}


const ticketStateReducer = (state = initialState, action) => {

  switch(action.type) {
    case types.CREATE_TICKET : {
      return {
        ...state,
      }
    }

    default: {
      return state;
    }
  }
};

export default ticketStateReducer;