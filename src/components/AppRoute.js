import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthStateContext } from "../context";

export const AppRoute = ({
  component: Component,
  path,
  isPrivate,
  ...rest
}) => {
  const userDetails = useContext(AuthStateContext);
  return (
    <Route
      path={path}
      render={(props) =>
        isPrivate && !Boolean(userDetails.token) ? (
          <Redirect to={{ pathname: "/inicioSesion" }} />
        ) : (
          <Component {...props} />
        )
      }
      {...rest}
    />
  );
};
