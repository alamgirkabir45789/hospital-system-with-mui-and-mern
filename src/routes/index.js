import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { useLocation } from 'react-router-dom';
import AdminPage from 'views/Admin/AdminPage';
import Error404 from '../views/404';
import SamplePage from '../views/SamplePage';
import TestPage from '../views/TestPage/TestPage';
import ForgotPasswordPage from './Auth/ForgotPassword';
import Login from './Auth/Login';
import Register from './Auth/Register';

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
    return <Redirect to={'/admin'} />;
  }

  return (
    <React.Fragment>
      <Switch>
        <Route path="/sample-page" component={SamplePage} />
        <RestrictedRoute path="/admin" component={AdminPage} />
        <Route path="/test-page" component={TestPage} />
        <Route path="/signin" component={Login} />
        <Route path="/signup" component={Register} />
        <Route path="/forgot-password" component={ForgotPasswordPage} />
        <Route component={Error404} />
      </Switch>
    </React.Fragment>
  );
};

export default Routes;
