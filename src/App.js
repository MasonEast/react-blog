import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch, Link, IndexRoute } from 'dva/router';
import dynamic from 'dva/dynamic'      //参数： app： dva实例
import RouteGlobal from '@/config'
import RouteWithSubRoutes from '@/config/RouteWithSubRoutes'


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
