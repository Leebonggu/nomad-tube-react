/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from 'context/AuthContext';



function ProtectedRoute({ path, component: Component, render, ...rest }) {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Route 
      path={path}
      {...rest}
      render={(props) => {
        if (isLoggedIn) return <Redirect to="/" />
        return Component ? <Component {...props} /> : render(props)
      }}
    />
  );
}

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.elementType,
  render: PropTypes.func,
};
