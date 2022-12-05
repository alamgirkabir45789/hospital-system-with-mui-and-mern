const { FETCH_DOCTORS, FETCH_DOCTOR_BY_ID } = require('../actionTypes');

const initialState = {
  doctors: [],
  selectedDoctor: null,
};
export const doctorReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_DOCTORS: {
      return {
        ...state,
        doctors: payload,
      };
    }
    case FETCH_DOCTOR_BY_ID: {
      return {
        ...state,
        selectedDoctor: payload,
      };
    }
    default:
      return state;
  }
};
