import Axios from 'axios';
import { FETCH_SCHEDULE_BY_DOCTOR_ID } from '../actionTypes';

export const fetchScheduleByDoctorId = doctorId => {
  return async dispatch => {
    const res = await Axios.get(`http://localhost:7000/api/schedule/doctor/${doctorId}`);
    dispatch({
      type: FETCH_SCHEDULE_BY_DOCTOR_ID,
      payload: res.data,
    });
  };
};
