import React from "react";
import { Route } from "react-router-dom";
import useIsAuthenticatedUserEncuestaPublic from "./useIsAuthenticatedUserEncuestaPublic";

export const RouteWithAuthUserEncuestaPublic = ({ render, ...restProps }) => {
  let authResult = useIsAuthenticatedUserEncuestaPublic(
    restProps.computedMatch.params.operacion ? true : false
  );
  authResult = { ...authResult, servicePublic: restProps.computedMatch.params };
  return (
    <Route
      // {...restProps}
      exact={restProps.exact}
      path={restProps.path}
      render={render.bind(null, authResult)}
    />
  );
};
