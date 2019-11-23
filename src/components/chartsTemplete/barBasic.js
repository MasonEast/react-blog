let option = {
    title: {
        show: true,
        text: '基本柱图',
        textStyle: {
            color: '#999'
        }
    },
    color: ['#63B8FF', '#9AFF9A', '#EEAD0E'],
    tooltip: {},
    legend: {
        show: true,
        right: 30,
        data: ['销量'],
        textStyle: {
            color: '#fff'
        }
    },
    xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        axisTick: {    // 坐标轴 刻度
            show: false,  // 是否显示
            inside: true,  // 是否朝内
            length: 1,     // 长度
            lineStyle: {   // 默认取轴线的样式
                color: '#999',
                width: 1,
                type: 'solid'
            }
        },
        // 设置X轴数据旋转倾斜
        axisLabel: {
            // rotate: 30, // 旋转角度
            interval: 0,  //设置X轴数据间隔几个显示一个，为0表示都显示
            fontSize: 10
        },
        //设置坐标轴字体颜色和宽度
        axisLine: {
            lineStyle: {
                color: '#CFCFCF',
                width: 2
            }
        }
    },
    yAxis: {
        axisTick: {    // 坐标轴 刻度
            show: false,  // 是否显示

        },
        axisLine: {
            lineStyle: {
                color: '#CFCFCF',
                width: 2
            }
        },
        splitLine: {    //中间的分隔线
            lineStyle: {
                // 设置y轴颜色
                color: '#999',
                opacity: 0
            }
        }
    },
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20],
        barWidth: 10,//柱图宽度
        barCategoryGap: '10%'
    }]
};

export default option