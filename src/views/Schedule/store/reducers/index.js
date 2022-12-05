import { FETCH_SCHEDULE_BY_DOCTOR_ID } from '../actionTypes';

const initialState = {
  selectedSchedule: [],
};
export const scheduleReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_SCHEDULE_BY_DOCTOR_ID: {
      return {
        ...state,
        selectedSchedule: payload,
      };
    }

    default:
      return state;
  }
};
