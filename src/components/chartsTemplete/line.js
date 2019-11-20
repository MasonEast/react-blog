import React from 'react';
import { Card } from 'antd';
// import echartTheme from './../themeLight'
//不是按需加载的话文件太大
//import echarts from 'echarts'
//下面是按需加载
import echarts from 'echarts/lib/echarts'
//导入折线图
import 'echarts/lib/chart/line';  //折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';
export default class Line extends React.Component {
    // componentWillMount () {
    //     //主题的设置要在willmounted中设置
    //     echarts.registerTheme('Imooc', echartTheme);
    // }
    getOption = () => {
        let option = {
            title: {
                text: '用户骑行订单',
                x: 'center'
            },
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'OFO订单量',
                    type: 'line',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data: [1000, 2000, 1500, 3000, 2000, 1200, 800]
                }
            ]
        }
        return option
    }

    render () {
        return (
            <div>
                <Card title="折线图表之一">
                    <ReactEcharts option={this.getOption()} theme="Imooc" style={{ height: '400px' }} />
                </Card>

            </div>
        )
    }
}