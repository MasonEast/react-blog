import React from 'react';
import { BrowserRouter, Switch, Route } from 'dva/router';
import RouteGlobal from '@/route'
import RouteWithSubRoutes from '@/route/RouteWithSubRoutes'
import '@/assets/css/init.css'
import 'highlight.js/styles/github.css';
import { useDrop, DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'


export default function RouteConfigExample () {
    return (
        <DndProvider backend={HTML5Backend}>

            <BrowserRouter>
                <Switch>
                    {RouteGlobal.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </Switch>
            </BrowserRouter>
        </DndProvider>

    );
}
