import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import session from '../../utils/session';

function PrivateRoute({ component: Component, ...restProps }) {
  return <Route {...restProps} render={(props) => (session.isAuthenticated() ? <Component {...props} /> : <Redirect to='/login' />)} />;
}

PrivateRoute.propTypes = {
  component: PropTypes.elementType
};

export default PrivateRoute;
