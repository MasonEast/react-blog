import { Tabs, InputNumber, Icon } from 'antd';
import React, { useState, useEffect } from 'react'
import './tab.less'
import OptionMenu from './optionMenu'
const { TabPane } = Tabs;

const Tbar = (props) => {
    const { changeView, select } = props
    const [view, setView] = useState({})

    useEffect(() => {
        // select.option && setOpenKeys([Object.keys(select.option)[0]])
        setView(select)
    }, [select])
    const { id, left, top, width, height, option } = view


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
                            <InputNumber size="small" step={10} value={width} onChange={(v) => changeView('changeview', v, id, 'width')} />
                            <InputNumber size="small" step={10} value={height} onChange={(v) => changeView('changeview', v, id, 'height')} />                        </li>
                        <li>
                            <span>图表位置</span>
                            <InputNumber size="small" step={10} value={left} onChange={(v) => changeView('changeview', v, id, 'left')} />
                            <InputNumber size="small" step={10} value={top} onChange={(v) => changeView('changeview', v, id, 'top')} />
                        </li>
                        <li>
                            <span>图表样式</span>
                            <OptionMenu option={option} changeView={changeView} id={id} />
                        </li>

                    </ul>

                }

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
