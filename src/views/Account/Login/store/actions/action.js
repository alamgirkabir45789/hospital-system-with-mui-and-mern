import { USER_API } from 'services/api-end-points/user';
import { baseAxios } from 'services/auth';
import { CREATE_USER } from '../actionTypes/actionType';

export const createUser = user => {
  return async dispatch => {
    const res = await baseAxios.post(USER_API.create, user);
    dispatch({
      type: CREATE_USER,
      payload: res.data,
    });
  };
};
