import React, { Component } from 'react';
import { Menu } from 'antd';
import { Switch, Link } from 'dva/router';
import RouteWithSubRoutes from '@/route/RouteWithSubRoutes'
import '../Admin/index.less'
import { judgeWidth } from '@/utils'

interface Iprops {
    routes: Array<any>
}


const Library: React.FC<Iprops> = (props: Iprops) => {
    const handleClick = (e: object) => {
    }
    return (
        <div className="admin-box">
            <div className="admin-left">
                <Menu
                    className="admin-left-menu"
                    onClick={handleClick}
                    style={judgeWidth() ? { width: 256 } : { width: 120 }}
                    defaultSelectedKeys={['canvas']}
                    mode="vertical"
                >
                    <Menu.Item key="canvas">
                        <Link to="/library/canvas">
                            Canvas
                            </Link>
                    </Menu.Item>
                    <Menu.Item key="paint">
                        <Link to="/library/paint">
                            Paint
                            </Link>
                    </Menu.Item>
                    <Menu.Item key="charts">
                        <Link to="/library/charts">
                            Charts
                            </Link>
                    </Menu.Item>
                </Menu>
            </div>
            <div className="admin-right">
                <Switch>
                    {props.routes.map((route, i) => (
                        < RouteWithSubRoutes key={i} {...route} />
                    ))}
                </Switch>
            </div>
        </div>

    )
}

export default Library






