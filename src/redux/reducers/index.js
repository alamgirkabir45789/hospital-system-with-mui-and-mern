import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { userReducer } from 'views/Account/Register/store/reducers/reducers';
import { doctorReducer } from 'views/DoctorPage/store/reducers/index';
import { scheduleReducer } from 'views/Schedule/store/reducers/index';
import Auth from './Auth';
import Common from './Common';

export default history =>
  combineReducers({
    router: connectRouter(history),
    common: Common,
    auth: Auth,
    userReducer: userReducer,
    doctorReducer: doctorReducer,
    scheduleReducer: scheduleReducer,
  });
