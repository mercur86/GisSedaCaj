import React from 'react';
import { Route } from 'react-router-dom';
import useIsAuthenticated from './useIsAuthenticated';

export const RouteWithAuth = ({ render, ...restProps }) => {
    let authResult = useIsAuthenticated(restProps.computedMatch.params.operacion ? true : false);
     authResult = { ...authResult, servicePublic: restProps.computedMatch.params };
    return <Route
        // {...restProps}
        exact={restProps.exact}
        path={ restProps.path }
        render={render.bind(null, authResult)}
    />
}