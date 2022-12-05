import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { useLocation } from 'react-router-dom';
import UserAccount from 'views/Account/Register';
import Appointment from 'views/Appointment';
import Department from 'views/DepartmentPage';
import Doctor from 'views/DoctorPage';
import Role from 'views/Role';
import Schedule from 'views/Schedule';
import Error404 from '../views/404';
import About from '../views/About';
import Login from '../views/Account/Login/form/Login';
import Register from '../views/Account/Register/form/Register';
import Dashboard from '../views/Dashboard';
import SamplePage from '../views/SamplePage';
import ForgotPasswordPage from './Auth/ForgotPassword';

const RestrictedRoute = ({ component: Component, ...rest }) => {
  const { authUser } = useSelector(({ auth }) => auth);
  return (
    <Route
      {...rest}
      render={props =>
        authUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const Routes = () => {
  const { authUser } = useSelector(({ auth }) => auth);
  const location = useLocation();

  if (location.pathname === '' || location.pathname === '/') {
    return <Redirect to={'/sample-page'} />;
  } else if (authUser && location.pathname === '/signin') {
    return <Redirect to={'/user'} />;
  }
  // if (location.pathname === '' || location.pathname === '/') {
  //   return <Redirect to={'/department'} />;
  // } else if (authUser && location.pathname === '/signin') {
  //   return <Redirect to={'/department'} />;
  // }

  return (
    <React.Fragment>
      <Switch>
        <Route path="/sample-page" component={SamplePage} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/about" component={About} />
        <RestrictedRoute path="/user" component={UserAccount} />
        <RestrictedRoute path="/role" component={Role} />
        <RestrictedRoute path="/department" component={Department} />
        <RestrictedRoute path="/doctor" component={Doctor} />
        <RestrictedRoute path="/schedule" component={Schedule} />
        <RestrictedRoute path="/appointment" component={Appointment} />
        <Route path="/signin" component={Login} />
        <Route path="/signup" component={Register} />
        <Route path="/forgot-password" component={ForgotPasswordPage} />
        <Route component={Error404} />
      </Switch>
    </React.Fragment>
  );
};

export default Routes;
