import { Tabs, InputNumber, Icon } from 'antd';
import React from 'react'
const { TabPane } = Tabs;

const Tbar = (props) => {

    const [view, setView] = React.useState({})
    const { changeView, select } = props
    React.useEffect(() => {

        setView(select)
    }, [select])
    const { id, left, top, width, height } = view
    return (
        <Tabs defaultActiveKey="1" style={{ color: '#fff' }}>
            <TabPane
                tab={
                    <span>
                        <Icon type="apple" />
                        图表样式
                </span>
                }
                key="1"
            >
                {id &&
                    <ul id="propertyUl">
                        <h2 style={{ color: '#fff' }}>{id}</h2>
                        <li>
                            <span>图表尺寸</span>
                            <InputNumber size="small" step={10} value={width} onChange={(v) => changeView(v, id, 'changeview', 'width')} />
                            <InputNumber size="small" step={10} value={height} onChange={(v) => changeView(v, id, 'changeview', 'height')} />                        </li>
                        <li>
                            <span>图表位置</span>
                            <InputNumber size="small" step={10} value={left} onChange={(v) => changeView(v, id, 'changeview', 'left')} />
                            <InputNumber size="small" step={10} value={top} onChange={(v) => changeView(v, id, 'changeview', 'top')} />
                        </li>
                        <li>
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
