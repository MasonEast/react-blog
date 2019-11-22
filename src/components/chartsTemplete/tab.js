import { Tabs, InputNumber, Input, Menu, Icon } from 'antd';
import React, { useState, useRef, useEffect } from 'react'
import './tab.less'
const { TabPane } = Tabs;
const { SubMenu } = Menu;

const Tbar = (props) => {
    const { changeView, select } = props
    const [view, setView] = useState({})
    const [openKeys, setOpenKeys] = useState([])
    let rootSubmenuKeys = []

    useEffect(() => {
        // select.option && setOpenKeys([Object.keys(select.option)[0]])
        setView(select)
    }, [select])
    console.log(select)
    const { id, left, top, width, height, option } = view

    if (option) {
        rootSubmenuKeys = Object.keys(option);
    }

    const onOpenChange = key => {                       //控制菜单开合的方法

        const latestOpenKey = key.find(key => openKeys.indexOf(key) === -1);

        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(key);
        } else {
            setOpenKeys(
                latestOpenKey ? [latestOpenKey] : [],
            );
        }
    };

    const onPressEnter = (e, item, fatherItem = '') => {              //input框监听回车事件， 改变对应图表的样式
        e.persist()
        changeView(e.target.value, id, 'changeOption', item, fatherItem)
    }

    return (
        <Tabs className="tabs" defaultActiveKey="1" style={{ color: '#fff' }}>
            <TabPane className="tabpane"
                tab={
                    <span>
                        <Icon type="apple" />
                        图表样式
                </span>
                }
                key="1"
            >
                {id &&
                    <ul className="propertyUL">
                        <h2 style={{ color: '#fff' }}>表名： {id}</h2>
                        <li>
                            <span>图表尺寸</span>
                            <InputNumber size="small" step={10} value={width} onChange={(v) => changeView(v, id, 'changeview', 'width')} />
                            <InputNumber size="small" step={10} value={height} onChange={(v) => changeView(v, id, 'changeview', 'height')} />                        </li>
                        <li>
                            <span>图表位置</span>
                            <InputNumber size="small" step={10} value={left} onChange={(v) => changeView(v, id, 'changeview', 'left')} />
                            <InputNumber size="small" step={10} value={top} onChange={(v) => changeView(v, id, 'changeview', 'top')} />
                        </li>
                        {/* <li>
                            <span>透明度</span>
                        </li>
                        <li>
                            <span>标题</span>
                        </li>
                        <li>
                            <span>x轴</span>
                        </li>
                        <li>
                            <span>y轴</span>
                        </li>
                        <li>
                            <span>图表尺寸</span>
                        </li>
                        <li>
                            <span>图表尺寸</span>
                        </li> */}
                        <li>
                            <span>图表样式</span>
                            <Menu
                                className="tab-menu"
                                theme="dark"
                                mode="inline"
                                openKeys={openKeys}
                                onOpenChange={(v) => onOpenChange(v)}
                                style={{ width: '100%', height: '100%' }}
                            >
                                {
                                    Object.keys(option).map(v => {
                                        return (
                                            <SubMenu
                                                className="tab-submenu"
                                                key={v}
                                                title={
                                                    <span>
                                                        <span>{v}</span>
                                                    </span>
                                                }
                                            >
                                                {
                                                    Object.keys(option[v]).map(item => {
                                                        return (
                                                            <Menu.Item key={item} className="tab-menuitem">
                                                                <span style={{ marginRight: '5px' }}>{item}</span>
                                                                <Input
                                                                    onPressEnter={(e) => onPressEnter(e, item, v)}
                                                                    className="menuitem-input"
                                                                    defaultValue={option[v][item]}
                                                                />
                                                            </Menu.Item>
                                                        )
                                                    })
                                                }
                                            </SubMenu>
                                        )
                                    })
                                }
                            </Menu>

                        </li>

                    </ul>

                }

                {/* {option && } */}


            </TabPane>
            <TabPane
                tab={
                    <span>
                        <Icon type="android" />
                        数据源
                </span>
                }
                key="2"
            >
                Tab 2
            </TabPane>
        </Tabs>

    )
}

export default Tbar
