import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link, IndexRoute } from 'dva/router';
import RouteWithSubRoutes from '@/config/RouteWithSubRoutes'
class BBB extends Component {
    render () {
        console.log(this.props)
        return (
            <div>
                <p>
                    dddd页
                    <Link to="/fff/sss" >gogogo</Link>
                    <Link to="/fff/about" >about</Link>
                </p>
                <Switch>
                    {this.props.routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </Switch>
            </div>
        );
    }
}

export default BBB;