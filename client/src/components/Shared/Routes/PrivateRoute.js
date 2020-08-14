import { isAuthenticated } from "./permissionChecker";
import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  /* const currentUser = useSelector(userSelectors.selectCurrentUser); */
  const dispatch = useDispatch();

  /*  useEffect(() => {
    if (isAuthenticated()) {
      configSocket();
    }

    // dispatch(socketActions.doConnect());
    if (!currentUser && isAuthenticated()) {
      dispatch(userActions.getCurrent());
    }
  }); */
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated() ? (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
