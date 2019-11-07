import React from 'react';
import { BrowserRouter, Switch, Redirect } from 'dva/router';
import RouteGlobal from '@/route'
import RouteWithSubRoutes from '@/route/RouteWithSubRoutes'
import '@/assets/css/init.css'
import 'highlight.js/styles/github.css';

export default function RouteConfigExample () {
    return (
        <BrowserRouter>
            <Switch>
                {RouteGlobal.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}

            </Switch>
        </BrowserRouter>
    );
}
