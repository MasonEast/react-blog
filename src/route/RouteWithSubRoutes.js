import React from 'react'
import { Route } from 'dva/router'

export default function RouteWithSubRoutes (route) {
    return (
        <Route
            path={route.path}
            render={props => (
                <route.component {...props} routes={route.routes} />
            )}
        />
    );
}