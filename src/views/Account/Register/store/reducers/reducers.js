import { FETCH_ALL_USERS } from '../actionTypes/actionType';
const initialState = {
  users: [],
};
export const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ALL_USERS: {
      const { users } = payload;
      return {
        ...state,
        users: users,
      };
    }
    default: {
      return state;
    }
  }
};
