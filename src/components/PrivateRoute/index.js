import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  // Show the component only when the user is logged in
  // Otherwise, redirect the user to /signin page
  <Route
    {...rest}
    render={(props) => (
      sessionStorage.getItem('x-access-token')
        ? <Component {...props} />
        : <Redirect to="/signin" />
    )}
  />
);

export default PrivateRoute;