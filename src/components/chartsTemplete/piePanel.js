import echarts from 'echarts/lib/echarts'

var dataArr = [{
    value: 91,
    name: '综合健康评分'
}];
var color = new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
    offset: 0,
    color: '#5CF9FE' // 0% 处的颜色
},
{
    offset: 0.17,
    color: '#468EFD' // 100% 处的颜色
},
{
    offset: 0.9,
    color: '#468EFD' // 100% 处的颜色
},
{
    offset: 1,
    color: '#5CF9FE' // 100% 处的颜色
}
]);
var colorSet = [
    [0.91, color],
    [1, '#15337C']
];
var rich = {
    white: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '500',
        padding: [-150, 0, 0, 0]
    },
    bule: {
        fontSize: 30,
        fontFamily: 'DINBold',
        color: '#fff',
        fontWeight: '700',
        padding: [-120, 0, 0, 0],
    },
    radius: {
        width: 150,
        height: 20,
        // lineHeight:80,
        borderWidth: 1,
        borderColor: '#0092F2',
        fontSize: 20,
        color: '#fff',
        backgroundColor: '#1B215B',
        borderRadius: 20,
        textAlign: 'center',
    },
    size: {
        height: 200,
        padding: [40, 0, 0, 0]
    }
}
let option = {
    // backgroundColor: '#0E1327',
    tooltip: {
        formatter: "{a} <br/>{b} : {c}%"
    },

    series: [{ //内圆
        type: 'pie',
        radius: '85%',
        center: ['50%', '50%'],
        z: 0,
        itemStyle: {
            normal: {
                color: new echarts.graphic.RadialGradient(.5, .5, 1, [{
                    offset: 0,
                    color: 'rgba(17,24,43,0)'
                },
                {
                    offset: .5,
                    // color: '#1E2B57'
                    color: 'rgba(28,42,91,.6)'
                },
                {
                    offset: 1,
                    color: '#141C33',
                    // color:'rgba(17,24,43,0)'
                }
                ], false),
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            },
        },
        hoverAnimation: false,
        label: {
            show: false,
        },
        tooltip: {
            show: false
        },
        data: [100],
    },
    {
        type: 'gauge',
        name: '外层辅助',
        radius: '74%',
        startAngle: '225',
        endAngle: '-45',
        splitNumber: '100',
        pointer: {
            show: false
        },
        detail: {
            show: false,
        },
        data: [{
            value: 1
        }],
        // data: [{value: 1, name: 90}],
        title: {
            show: true,
            offsetCenter: [0, 30],
            textStyle: {
                color: '#fff',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontFamily: '微软雅黑',
                fontSize: 10,
            }
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: [
                    [1, '#00FFFF']
                ],
                width: 2,
                opacity: 1
            }
        },
        axisTick: {
            show: false
        },
        splitLine: {
            show: true,
            length: 20,
            lineStyle: {
                color: '#051932',
                width: 0,
                type: 'solid',
            },
        },
        axisLabel: {
            show: false
        }
    },
    {
        type: 'gauge',
        radius: '70%',
        startAngle: '225',
        endAngle: '-45',
        pointer: {
            show: false
        },
        detail: {
            formatter: function (value) {
                var num = Math.round(value);
                return '{bule|' + num + '}{white|分}' + '{size|' + '}\n{radius|综合健康评分}';
            },
            rich: rich,
            "offsetCenter": ['0%', "0%"],
        },
        data: dataArr,
        title: {
            show: false,
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: colorSet,
                width: 25,
                // shadowBlur: 15,
                // shadowColor: '#B0C4DE',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                opacity: 1
            }
        },
        axisTick: {
            show: false
        },
        splitLine: {
            show: false,
            length: 25,
            lineStyle: {
                color: '#00377a',
                width: 2,
                type: 'solid',
            },
        },
        axisLabel: {
            show: false
        },
    },
    {
        name: '灰色内圈', //刻度背景
        type: 'gauge',
        z: 2,
        radius: '60%',
        startAngle: '225',
        endAngle: '-45',
        //center: ["50%", "75%"], //整体的位置设置
        axisLine: { // 坐标轴线
            lineStyle: { // 属性lineStyle控制线条样式
                color: [
                    [1, '#018DFF']
                ],
                width: 2,
                opacity: 1, //刻度背景宽度
            }
        },
        splitLine: {
            show: false
        },
        // data: [{
        //     show: false,
        //     value: '80'
        // }], //作用不清楚
        axisLabel: {
            show: false
        },
        pointer: {
            show: false
        },
        axisTick: {
            show: false
        },
        detail: {
            show: 0
        }
    },
    {
        name: "白色圈刻度",
        type: "gauge",
        radius: "60%",
        startAngle: 225, //刻度起始
        endAngle: -45, //刻度结束
        z: 4,
        axisTick: {
            show: false
        },
        splitLine: {
            length: 16, //刻度节点线长度
            lineStyle: {
                width: 2,
                color: 'rgba(1,244,255, 0.9)'
            } //刻度节点线
        },
        axisLabel: {
            color: 'rgba(255,255,255,0)',
            fontSize: 12,
        }, //刻度节点文字颜色
        pointer: {
            show: false
        },
        axisLine: {
            lineStyle: {
                opacity: 0
            }
        },
        detail: {
            show: false
        },
        data: [{
            value: 0,
            name: ""
        }]
    },
    { //内圆
        type: 'pie',
        radius: '56%',
        center: ['50%', '50%'],
        z: 1,
        itemStyle: {
            normal: {
                color: new echarts.graphic.RadialGradient(.5, .5, .8, [{
                    offset: 0,
                    color: '#4978EC'
                },
                {
                    offset: .5,
                    color: '#1E2B57'
                },
                {
                    offset: 1,
                    color: '#141F3D'
                }
                ], false),
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            },
        },
        hoverAnimation: false,
        label: {
            show: false,
        },
        tooltip: {
            show: false
        },
        data: [100],
    },
    ]
};

export default option