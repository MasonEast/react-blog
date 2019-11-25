var value = 0.12
var data = []
data.push(value)
data.push(value)
data.push(value)
data.push(value)
data.push(value)
var option = {
    // backgroundColor: '#1b2735',
    title: {
        text: 'CPU使用率',
        textStyle: {
            fontWeight: 'normal',
            fontSize: 25,
            color: 'rgb(97, 142, 205)'
        }
    },
    series: [{
        type: 'liquidFill',
        radius: '80%',
        data: data,
        backgroundStyle: {
            borderWidth: 5,
            borderColor: 'rgb(255,0,255,0.9)',
            color: 'rgb(255,0,255,0.01)'
        },
        label: {
            normal: {
                formatter: (value * 100).toFixed(2) + '%',
                textStyle: {
                    fontSize: 50
                }
            }
        }
    }]
}

export default option