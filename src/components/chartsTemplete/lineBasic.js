// 指定图表的配置项和数据

var option = {
    title: {
        text: '基本折线图',
        show: true,
        // textStyle: {
        //     color: '#999'
        // }
    },
    // backgroundColor: '#FFF0F5',

    // title: {
    //   text: '折线图',
    //   subtext: '模拟数据',
    //   x: 'center'
    // },

    legend: {
        color: '#fff',
        show: true,
        top: 10,
        right: 10,
        // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
        orient: 'horizontal',
        // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
        // x: 'right',
        // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
        // y: 'top',
        // data: ['预期', '实际', '假设']

    },

    //  图表距边框的距离,可选值：'百分比'¦ {number}（单位px）
    grid: {
        top: '16%',   // 等价于 y: '16%'
        left: '3%',
        right: '8%',
        bottom: '3%',
        containLabel: true
    },

    // 提示框
    tooltip: {
        trigger: 'axis'
    },

    // //工具框，可以选择
    // toolbox: {
    //   feature: {
    //     saveAsImage: {} //下载工具
    //   }
    // },

    xAxis: {
        // name: '周几',
        type: 'category',
        axisLine: {
            lineStyle: {
                // 设置x轴颜色
                color: '#CFCFCF'
            }
        },
        // 设置X轴数据旋转倾斜
        axisLabel: {
            rotate: 30, // 旋转角度
            interval: 0,  //设置X轴数据间隔几个显示一个，为0表示都显示
            fontSize: 10
        },
        axisTick: {    // 坐标轴 刻度
            show: false,  // 是否显示

        },
        // boundaryGap值为false的时候，折线第一个点在y轴上
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },

    yAxis: {
        // name: '数值',
        type: 'value',
        min: 0, // 设置y轴刻度的最小值
        max: 1800,  // 设置y轴刻度的最大值
        splitNumber: 9,  // 设置y轴刻度间隔个数

        axisTick: {    // 坐标轴 刻度
            show: false,  // 是否显示

        },
        axisLine: {
            lineStyle: {
                // 设置y轴颜色
                color: '#CFCFCF'
            }
        },
        splitLine: {    //中间的分隔线
            lineStyle: {
                // 设置y轴颜色
                color: '#999',
                opacity: 0.6
            }
        }
    },

    series: [
        {
            name: '预期',
            color: '#63B8FF',
            data: [820, 932, 301, 1434, 1290, 1330, 1320],
            type: 'line',
            // 设置小圆点消失
            // 注意：设置symbol: 'none'以后，拐点不存在了，设置拐点上显示数值无效
            symbol: 'none',
            // 设置折线弧度，取值：0-1之间
            smooth: 0.5,
            areaStyle: {
                // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: 'red' // 0% 处的颜色
                    }, {
                        offset: 1, color: 'blue' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                }
            }
        },

    ],

    color: ['#63B8FF', '#9AFF9A', '#EEAD0E'],
};


export default option