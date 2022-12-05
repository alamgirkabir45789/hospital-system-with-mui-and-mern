import { CREATE_USER } from '../actionTypes/actionType';

const initialState = {
  user: null,
};

export const loginReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_USER: {
      return {
        ...state,
        users: payload,
      };
    }
    default: {
      return state;
    }
  }
};
