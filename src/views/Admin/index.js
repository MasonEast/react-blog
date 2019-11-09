import React, { Component } from 'react';
import { Menu } from 'antd';
import { Switch, Link } from 'dva/router';
import RouteWithSubRoutes from '@/route/RouteWithSubRoutes'
import './index.less'
import { judgeWidth } from '@/utils'
class Admin extends Component {

    render () {
        return (
            <div className="admin-box">
                <div className="admin-left">
                    <Menu
                        className="admin-left-menu"
                        onClick={this.handleClick}
                        style={judgeWidth() ? { width: 256 } : { width: 120 }}
                        defaultSelectedKeys={['blog']}
                        mode="vertical"
                    >
                        <Menu.Item key="blog">
                            <Link to="/admin/blogmanage">

                                Blog Manage
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="mail">
                            <Link to="/admin/blogdraft">

                                BLog Draft
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="write">
                            <Link to="/admin/blogwrite">

                                Blog Write
                            </Link>
                        </Menu.Item>
                    </Menu>
                </div>
                <div className="admin-right">
                    <Switch>
                        {this.props.routes.map((route, i) => (
                            < RouteWithSubRoutes key={i} {...route} />
                        ))}
                    </Switch>
                </div>
            </div>
        )
    }
}

export default Admin




