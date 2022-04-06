import * as types from "./../constant/actionTypes.js";

const initialState = {
  problem: '',
  tried: '',
  expect: '',
  hypothesis: '',
  urgency: 1,
  inProgress: false,
  heading: '',
  brief: '',
  user_id: 0,
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