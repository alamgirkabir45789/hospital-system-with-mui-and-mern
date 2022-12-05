import {
  SAVE_PERMISSION,
  SEND_FORGET_PASSWORD_EMAIL,
  UPDATE_AUTH_USER,
  UPDATE_LOAD_USER,
} from '../../@jumbo/constants/ActionTypes';

export const setAuthUser = user => {
  return dispatch => {
    dispatch({
      type: UPDATE_AUTH_USER,
      payload: user,
    });
  };
};

export const updateLoadUser = loading => {
  return dispatch => {
    dispatch({
      type: UPDATE_LOAD_USER,
      payload: loading,
    });
  };
};

export const saveUserPermission = permission => {
  return dispatch => {
    dispatch({
      type: SAVE_PERMISSION,
      payload: permission,
    });
  };
};

export const setForgetPassMailSent = status => {
  return dispatch => {
    dispatch({
      type: SEND_FORGET_PASSWORD_EMAIL,
      payload: status,
    });
  };
};
