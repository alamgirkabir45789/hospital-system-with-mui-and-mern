import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import { departments } from '@jumbo/constants/PermissionsType';
import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Switch } from 'react-router';
import ProtectedRoute from 'routes/Pages/ProtectedRoute';

const Appointment = ({ match }) => {
  const { userPermission } = useSelector(({ auth }) => auth);
  const hasViewPermission = userPermission?.includes(departments);

  const requestedUrl = match.url.replace(/\/$/, '');
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <ProtectedRoute
          exact
          path={`${requestedUrl}/`}
          component={lazy(() => import('./list/AppointmentListPage'))}
          isAuthenticated={hasViewPermission}
        />
        <ProtectedRoute
          exact
          path={`${requestedUrl}/new-appointment`}
          component={lazy(() => import('./form/AppointmentAddForm'))}
          isAuthenticated={hasViewPermission}
        />
        <ProtectedRoute
          exact
          path={`${requestedUrl}/edit-appointment`}
          component={lazy(() => import('./form/AppointmentEditForm'))}
          isAuthenticated={hasViewPermission}
        />
      </Switch>
    </Suspense>
  );
};

export default Appointment;
