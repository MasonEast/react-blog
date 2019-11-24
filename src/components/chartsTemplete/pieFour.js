
var data = [
    {
        name: '装备制造',
        value: 54
    }, {
        name: '现代材料',
        value: 44
    }, {
        name: '新能源',
        value: 35
    }, {
        name: '新一代信息技术',
        value: 30
    }, {
        name: '商贸物流',
        value: 20
    }]

var titleArr = [], seriesArr = [];
let colors = [['#389af4', '#dfeaff'], ['#ff8c37', '#ffdcc3'], ['#ffc257', '#ffedcc'], ['#fd6f97', '#fed4e0'], ['#a181fc', '#e3d9fe']]
data.forEach(function (item, index) {
    titleArr.push(
        {
            text: item.name,
            left: index * 20 + 10 + '%',
            top: '65%',
            textAlign: 'center',
            textStyle: {
                fontWeight: 'normal',
                fontSize: '16',
                color: colors[index][0],
                textAlign: 'center',
            },
        }
    );
    seriesArr.push(
        {
            name: item.name,
            type: 'pie',
            clockWise: false,
            radius: [60, 70],
            itemStyle: {
                normal: {
                    color: colors[index][0],
                    shadowColor: colors[index][0],
                    shadowBlur: 0,
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    },
                }
            },
            hoverAnimation: false,
            center: [index * 20 + 10 + '%', '50%'],
            data: [{
                value: item.value,
                label: {
                    normal: {
                        formatter: function (params) {
                            return params.value + '%';
                        },
                        position: 'center',
                        show: true,
                        textStyle: {
                            fontSize: '20',
                            fontWeight: 'bold',
                            color: colors[index][0]
                        }
                    }
                },
            }, {
                value: 100 - item.value,
                name: 'invisible',
                itemStyle: {
                    normal: {
                        color: colors[index][1]
                    },
                    emphasis: {
                        color: colors[index][1]
                    }
                }
            }]
        }
    )
});


let option = {
    // backgroundColor: "#fff",
    title: titleArr,
    series: seriesArr
}

export default option