import React from 'react';
import { useDrag } from 'react-dnd'
// import echartTheme from './../themeLight'
//不是按需加载的话文件太大
//import echarts from 'echarts'
//下面是按需加载
import echarts from 'echarts/lib/echarts'
import china from 'echarts/map/js/china'
import liquidFill from 'echarts-liquidfill'
//导入折线图
import 'echarts/lib/chart/line';  //折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';
import ClassNames from 'classnames'

import './index.less'
// import barBasicOption from './barBasic'
// import lineBasicOption from './lineBasic'
// import pieBasicOption from './pieBasic'

const style = {
    position: 'absolute',
    // border: '1px dashed gray',
    // backgroundColor: 'white',
    // padding: '0.5rem 1rem',
    cursor: 'move',
}

const Chart = (props) => {

    const chartRef = React.useRef()

    const { type, id, left, top, deleteChart, selectChart, active, width, height, option } = props
    const [{ isDragging }, drag] = useDrag({
        item: { id, left, top, type: 'box' },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    })

    React.useEffect(() => {
        chartRef.current.getEchartsInstance().setOption(option)
    }, [option])

    return (
        <div
            className={ClassNames({ 'active': active })}
            onDoubleClick={(e) => deleteChart(id)}
            onClick={(e) => selectChart(e, id)}
            ref={drag}
            style={{ ...style, left, top }}
        >
            <ReactEcharts
                option={option}
                theme="Imooc"
                style={{ width: `${width}px`, height: `${height}px` }}
                ref={chartRef}
            />
        </div>
    )
}

export default Chart





