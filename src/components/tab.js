import { Tabs, InputNumber, Icon } from 'antd';
import React from 'react'
const { TabPane } = Tabs;

const Tbar = (props) => {

    const { changeView, select } = props
    console.log(select)

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
                {select.id && <h2 style={{ color: '#fff' }}>{select.id}</h2>}
                <ul id="propertyUl">
                    <li>
                        <span>图表尺寸</span>
                        {/* <InputNumber size="small" step={10} onChange={this.widthChange.bind(this, changeItem, echartsProperty.myEcharts)} defaultValue={0} />
                        <InputNumber size="small" step={10} onChange={this.heightChange.bind(this, changeItem, echartsProperty.myEcharts)} defaultValue={0} /> */}
                    </li>
                    <li>
                        <span>图表位置</span>
                        <InputNumber size="small" step={10} defaultValue={0} onChange={(v) => changeView(v, 'positionX')} />
                        <InputNumber size="small" step={10} defaultValue={0} onChange={(v) => changeView(v, 'positionY')} />
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
