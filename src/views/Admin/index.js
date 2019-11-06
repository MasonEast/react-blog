import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Switch, Link } from 'dva/router';
import RouteWithSubRoutes from '@/route/RouteWithSubRoutes'
import './index.less'
class Admin extends Component {
    handleClick = e => {
        console.log('click ', e);
    };
    render () {
        return (
            <div className="admin-box">
                <div className="admin-left">
                    <Menu
                        className="admin-left-menu"
                        onClick={this.handleClick}
                        style={{ width: 256 }}
                        defaultSelectedKeys={['blog']}
                        mode="vertical"
                    >
                        <Menu.Item key="blog">
                            <Link to="/admin/blogmanage">
                                <Icon type="blog" />
                                Blog Manage
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="mail">
                            <Link to="/admin/blogdraft">
                                <Icon type="" />
                                BLog Draft
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="write">
                            <Link to="/admin/blogwrite">
                                <Icon type="" />
                                Blog Write
                            </Link>
                        </Menu.Item>
                        {/* <Menu.Item key="todo">
                            <Link to="/admin/todolist">
                                <Icon type="" />
                                Todo List
                            </Link>
                        </Menu.Item> */}
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




