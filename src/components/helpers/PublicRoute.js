import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import session from '../../utils/session';

function PublicRoute({ path, component: Component, ...restProps }) {
  return (
    <Route
      path={path}
      {...restProps}
      render={function (props) {
        if (path === '/' && session.isAuthenticate()) return <Redirect to='/home' />;

        return <Component {...props} />;
      }}
    />
  );
}

PublicRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.node
};

export default PublicRoute;
