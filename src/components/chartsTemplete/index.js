import React from 'react';
import { useDrag } from 'react-dnd'
// import echartTheme from './../themeLight'
//不是按需加载的话文件太大
//import echarts from 'echarts'
//下面是按需加载
import echarts from 'echarts/lib/echarts'
//导入折线图
import 'echarts/lib/chart/line';  //折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';

import barBasicOption from './barBasic'
import lineBasicOption from './lineBasic'
import pieBasicOption from './pieBasic'

const style = {
    position: 'absolute',
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    cursor: 'move',
}

const Chart = (props) => {
    const { type, id, left, top, } = props

    console.log(left, top)

    let option = {}
    switch (type) {
        case 'Line':
            option = lineBasicOption
            break
        case 'Bar':
            option = barBasicOption
            break
        case 'Pie':
            option = pieBasicOption
            break
        default:
            option = lineBasicOption
            break
    }
    return (
        <div style={{ ...style, left, top }}>
            <ReactEcharts option={option} theme="Imooc" style={{ width: '300px', height: '300px' }} />
        </div>
    )
}

export default Chart



