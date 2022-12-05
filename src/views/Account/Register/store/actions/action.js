import { USER_API } from 'services/api-end-points/user';
import { baseAxios } from 'services/auth';
import { DELETE_USER, FETCH_ALL_USERS } from '../actionTypes/actionType';

export const fetchAllUsers = () => {
  return async dispatch => {
    const res = await baseAxios.get(USER_API.fetch_all);
    dispatch({
      type: FETCH_ALL_USERS,
      payload: {
        users: res.data.result,
      },
    });
  };
};
export const deleteUser = userId => {
  return async dispatch => {
    const res = await baseAxios.delete(`${USER_API.delete}/${userId}`);
    console.log(res);
    if (res.status === 200) {
      dispatch(fetchAllUsers());
    }
    dispatch({
      type: DELETE_USER,
    });
  };
};
