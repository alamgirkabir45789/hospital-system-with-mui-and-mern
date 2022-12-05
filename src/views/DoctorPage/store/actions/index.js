import Axios from 'axios';
import { FETCH_DOCTORS, FETCH_DOCTOR_BY_ID } from '../actionTypes';

export const fetchAllDoctors = () => {
  return async dispatch => {
    const res = await Axios.get(`http://localhost:7000/api/doctor`);

    dispatch({
      type: FETCH_DOCTORS,
      payload: res.data,
    });
  };
};
export const fetchDoctorById = doctorId => {
  return async dispatch => {
    const res = await Axios.get(`http://localhost:7000/api/doctor/${doctorId}`);
    dispatch({
      type: FETCH_DOCTOR_BY_ID,
      payload: res.data,
    });
  };
};
