import axios from 'axios';
import React from 'react';
import { fetchError, fetchStart, fetchSuccess } from '../../../redux/actions';
import { setAuthUser, setForgetPassMailSent, updateLoadUser } from '../../../redux/actions/Auth';

const BasicAuth = {
  onRegister: ({ name, email, password }) => {
    return dispatch => {
      dispatch(fetchStart());

      setTimeout(() => {
        dispatch(fetchSuccess());
        const user = { name: name, email: email, password: password };
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(setAuthUser(user));
      }, 300);
    };
  },

  onLogin: payload => {
    return async dispatch => {
      const res = await axios.post('http://localhost:7000/api/login', payload);
      try {
        dispatch(fetchStart());

        setTimeout(() => {
          const user = { name: res.data.user.role, email: res.data.user._doc.email, password: res.data.user._doc.password };
          dispatch(fetchSuccess());
          localStorage.setItem('user', JSON.stringify(user));
          dispatch(setAuthUser(user));
        }, 300);
      } catch (error) {
        dispatch(fetchError(error.message));
      }
    };
  },
  onLogout: () => {
    return dispatch => {
      dispatch(fetchStart());

      setTimeout(() => {
        dispatch(fetchSuccess());
        localStorage.removeItem('user');
        dispatch(setAuthUser(null));
      }, 300);
    };
  },

  getAuthUser: (loaded = false) => {
    return dispatch => {
      dispatch(fetchStart());
      dispatch(updateLoadUser(loaded));

      setTimeout(() => {
        dispatch(fetchSuccess());
        dispatch(setAuthUser(JSON.parse(localStorage.getItem('user'))));
      }, 300);
    };
  },

  onForgotPassword: () => {
    return dispatch => {
      dispatch(fetchStart());

      setTimeout(() => {
        dispatch(setForgetPassMailSent(true));
        dispatch(fetchSuccess());
      }, 300);
    };
  },
  getSocialMediaIcons: () => {
    return <React.Fragment> </React.Fragment>;
  },
};

export default BasicAuth;
