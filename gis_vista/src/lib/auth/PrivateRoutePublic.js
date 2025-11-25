import React from 'react';
import { Route } from 'react-router-dom';
import useIsAuthenticatedPublic from './useIsAuthenticatedPublic';

export const RouteWithAuthPublic = ({ render, ...restProps }) => {
    let authResult = useIsAuthenticatedPublic(restProps.computedMatch.params.operacion ? true : false);
     authResult = { ...authResult, servicePublic: restProps.computedMatch.params };
    return <Route
        // {...restProps}
        exact={restProps.exact}
        path={ restProps.path }
        render={render.bind(null, authResult)}
    />
}