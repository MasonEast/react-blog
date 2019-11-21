import { Tabs, Icon } from 'antd';
import React from 'react'
const { TabPane } = Tabs;

const Tbar = () => {
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
                Tab 1
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
