import React from 'react';
import { BrowserRouter, Switch, Redirect } from 'dva/router';
import RouteGlobal from '@/route'
import RouteWithSubRoutes from '@/route/RouteWithSubRoutes'
import '@/assets/css/init.css'
import 'highlight.js/styles/github.css';
// import {GlobalIcon} from './assets/icon/iconfont'
// import {Icon} from 'antd'
// import iconfont from '@/assets/icon/iconfont.js'
// const  Iconfont = Icon.createFromIconfontCN({
//     scriptUrl: '//at.alicdn.com/t/font_1080232_1nvju5zpejp.js',
//         scriptUrl: iconfont
// });

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
