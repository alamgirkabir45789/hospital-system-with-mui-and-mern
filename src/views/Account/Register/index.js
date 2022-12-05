import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import { departments } from '@jumbo/constants/PermissionsType';
import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Switch } from 'react-router';
import ProtectedRoute from 'routes/Pages/ProtectedRoute';

const UserAccount = ({ match }) => {
  const { userPermission } = useSelector(({ auth }) => auth);
  const hasViewPermission = userPermission?.includes(departments);

  const requestedUrl = match.url.replace(/\/$/, '');
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <ProtectedRoute
          exact
          path={`${requestedUrl}/`}
          component={lazy(() => import('./list/UserList'))}
          isAuthenticated={hasViewPermission}
        />
        <ProtectedRoute
          exact
          path={`${requestedUrl}/new-user`}
          component={lazy(() => import('../Register/form/Register'))}
          isAuthenticated={hasViewPermission}
        />
        <ProtectedRoute
          exact
          path={`${requestedUrl}/edit-user`}
          component={lazy(() => import('../Register/form/UserEditForm'))}
          isAuthenticated={hasViewPermission}
        />
      </Switch>
    </Suspense>
  );
};

export default UserAccount;
