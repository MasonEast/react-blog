import { Menu, Icon } from 'antd';
import React from 'react'

const { SubMenu } = Menu;

export default class Sider extends React.Component {
    // submenu keys of first level
    rootSubmenuKeys = Object.keys(this.props.data);

    state = {
        openKeys: [this.rootSubmenuKeys[0]],
    };

    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

    render () {
        const { data, menuClick } = this.props
        return (
            <Menu
                theme="dark"
                mode="inline"
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
                style={{ width: '100%', height: '100%' }}
                onClick={(item) => menuClick(item)}
            >
                {
                    Object.keys(data).map(v => {
                        return (
                            <SubMenu
                                key={v}
                                title={
                                    <span>
                                        <Icon type={`${v.toLowerCase()}-chart`} />
                                        <span>{v}</span>
                                    </span>
                                }
                            >
                                {
                                    data[v].map(item => {
                                        return <Menu.Item key={item}>{item}</Menu.Item>
                                    })
                                }
                            </SubMenu>
                        )
                    })
                }
            </Menu>
        );
    }
}
