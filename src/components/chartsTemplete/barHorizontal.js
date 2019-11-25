var cost = [0.2, 0.201, 1]//本期比上期（大于1按1处理）
var dataCost = [1000.01, 200000, 200]//真是的金额
var totalCost = [1, 1, 1]//比例综合
var visits = [92, 102, 89]//本期占总的百分比*100
var grade = ['人次用药金额', '药品使用量', '用药金额']
var data = {
    title: "**省",
    grade: grade,
    cost: cost,
    totalCost: totalCost,
    visits: visits,
    dataCost: dataCost
};
let option = {
    // backgroundColor: '#05274C',
    title: {
        top: '5%',
        left: 'center',
        text: data.title + '年度用药情况整体统计',
        textStyle: {
            align: 'center',
            color: '#4DCEF8',
            fontSize: 18
        }
    },
    grid: {
        left: '240',
        right: '100'
    },
    xAxis: {
        show: false,
    },
    yAxis: {
        type: 'category',
        axisLabel: {
            margin: 100,
            show: true,
            color: '#4DCEF8',
            fontSize: 14
        },
        axisTick: {
            show: false,
        },
        axisLine: {
            show: false,
        },
        data: data.grade
    },
    series: [{
        type: 'bar',
        barGap: '-100%',
        label: {
            normal: {
                show: true,
                position: 'right',
                color: '#fff',
                fontSize: 14,
                formatter:
                    function (param) {
                        return '同比：' + data.visits[param.dataIndex] + '%';
                    },
            }
        },
        barWidth: '35%',
        itemStyle: {
            normal: {
                borderColor: '#4DCEF8',
                borderWidth: 2,
                barBorderRadius: 15,
                color: 'rgba(102, 102, 102,0)'
            },
        },
        z: 1,
        data: data.totalCost,
        // data: da
    }, {
        type: 'bar',
        barGap: '-98%',
        barWidth: '33%',
        itemStyle: {
            normal: {
                barBorderRadius: 16,
                color: {
                    type: 'linear',
                    x: 0,
                    x1: 1,
                    colorStops: [{
                        offset: 0,
                        color: '#02ddff'
                    }, {
                        offset: 1,
                        color: '#00feff'
                    }]
                }
            },
        },
        max: 1,
        label: {
            normal: {
                show: true,
                position: 'left',
                color: '#fff',
                fontSize: 14,
                formatter: function (param) {
                    if (param.dataIndex == '0') {
                        return data.dataCost[param.dataIndex] + '元';
                    }
                    if (param.dataIndex == '1') {
                        return data.dataCost[param.dataIndex];
                    }
                    if (param.dataIndex == '2') {
                        return data.dataCost[param.dataIndex] + '万';
                    }

                },
            }
        },
        labelLine: {
            show: true,
        },
        z: 2,
        data: data.cost,
    }]
}

export default option 