import React from 'react';
import './index.less'
import Line from '@/components/chartsTemplete/line'

const Charts = () => {

    const [chartsArr, setChartsArr] = React.useState([])
    // const [count, setCount] = React.useState(0)

    const [arr, dispath] = React.useReducer((state, action) => {
        switch (action.type) {
            case 'add':
                console.log(state)
                state.push(action.data)
                return state
            default:
                return state
        }
    }, [1]);
    // return (
    //     <div>
    //         <h1 className="title">{count}</h1>
    //         <button className="btn is-primary"
    //             onClick={() => dispath('add')}
    //         >Increment</button>
    //     </div>
    // )


    const createChart = (e) => {
        e.persist()
        switch (e.target.innerHTML) {
            case "折线图":
                setChartsArr([...chartsArr, `Line${chartsArr.length}`])
                break
            // return 
            default:
                return
        }
    }
    console.log(chartsArr)

    return (
        <div className="charts-box">
            <div className="charts-left">
                <ul onClick={createChart}>
                    <li>折线图</li>
                    <li>柱状图</li>
                    <li>饼图</li>
                    <li>中国地图</li>
                </ul>
            </div>
            <div className="charts-right">
                {
                    chartsArr.map(v => {
                        switch (v.replace(/[0-9]/g, '')) {
                            case 'Line':
                                return <Line key={v} />
                            default:
                                return false
                        }
                    })
                }
            </div>
        </div>
    )
}

export default Charts