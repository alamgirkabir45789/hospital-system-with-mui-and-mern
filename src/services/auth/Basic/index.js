import React from 'react';
import { LOGIN_API } from 'services/api-end-points/login';
import { baseAxios } from '..';
import { fetchError, fetchStart, fetchSuccess } from '../../../redux/actions';
import { saveUserPermission, setAuthUser, setForgetPassMailSent, updateLoadUser } from '../../../redux/actions/Auth';

const BasicAuth = {
  onRegister: ({ payload }) => {
    return dispatch => {
      dispatch(fetchStart());

      setTimeout(() => {
        dispatch(fetchSuccess());
        const user = payload;
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(setAuthUser(user));
      }, 300);
    };
  },
  // onRegister: ({ name, email, password }) => {
  //   return dispatch => {
  //     dispatch(fetchStart());

  //     setTimeout(() => {
  //       dispatch(fetchSuccess());
  //       const user = { name: name, email: email, password: password };
  //       localStorage.setItem('user', JSON.stringify(user));
  //       dispatch(setAuthUser(user));
  //     }, 300);
  //   };
  // },

  onLogin: payload => {
    return async dispatch => {
      console.log('hi');
      const res = await baseAxios.post(LOGIN_API.login, payload);

      try {
        dispatch(fetchStart());

        setTimeout(() => {
          const user = {
            name: res.data.user.role,
            email: res.data.user._doc.email,
            password: res.data.user._doc.password,
            userPermission: 'Admin',
          };
          dispatch(fetchSuccess());
          dispatch(saveUserPermission(user.userPermission));
          localStorage.setItem('user', JSON.stringify(user));
          dispatch(setAuthUser(user));
        }, 300);
      } catch (error) {
        dispatch(fetchError(error.message));
      }
    };
  },
  // onLogin: ({ email, password }) => {
  //   return dispatch => {
  //     console.log('hi');
  //     try {
  //       dispatch(fetchStart());

  //       setTimeout(() => {
  //         const user = {
  //           name: 'Admin',
  //           email: email,
  //           password: password,
  //           userPermission: 'Admin',
  //         };
  //         dispatch(fetchSuccess());
  //         dispatch(saveUserPermission(user.userPermission));
  //         localStorage.setItem('user', JSON.stringify(user));
  //         dispatch(setAuthUser(user));
  //       }, 300);
  //     } catch (error) {
  //       dispatch(fetchError(error.message));
  //     }
  //   };
  // },
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
