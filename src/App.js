import React from 'react';
import { BrowserRouter, Switch, Redirect } from 'dva/router';
// import dynamic from 'dva/dynamic'      //参数： app： dva实例
import RouteGlobal from '@/route'
import RouteWithSubRoutes from '@/route/RouteWithSubRoutes'
import '@/assets/css/init.css'

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
