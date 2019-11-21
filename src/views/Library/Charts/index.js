import React from 'react';
import './index.less'
import Chart from '@/components/chartsTemplete'
// import { SortableContainer, SortableElement } from 'react-sortable-hoc';
// import arrayMove from 'array-move';

import { DndProvider, useDrop } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { Button, Icon } from 'antd'
import Menu from '@/components/menu'
import Tabs from '@/components/tab'
const Charts = () => {

    const chartsType = {
        Line: ['lineBasic'],
        Bar: ['barBasic'],
        Pie: ['pieBasic']
    }
    const [fullFlag, setFullFlag] = React.useState(false)
    const [chartsObj, dispatch] = React.useReducer((state, action) => {
        // console.log('rd')
        const { id, left, top, type } = action
        return { ...state, [id]: { id, type, left, top } }
        // console.log(state, id)
        // switch (action.type) {
        //     case 'Line':
        //         {

        //             return { ...state, [id]: { id, type, left, top } }
        //         }
        //     case 'Bar':
        //         return { ...state, [id]: { id, type, left, top } }
        //     default:
        //         return state
        // }
    }, {});

    const createChart = (item) => {
        switch (item.key) {
            case "lineBasic":
                dispatch({ type: 'lineBasic', id: `lineBasic${Object.keys(chartsObj).length}`, left: 20, top: 20 })
                break
            case "barBasic":
                dispatch({ type: 'barBasic', id: `barBasic${Object.keys(chartsObj).length}`, left: 20, top: 20 })
                break
            case "pieBasic":
                dispatch({ type: 'pieBasic', id: `pieBasic${Object.keys(chartsObj).length}`, left: 20, top: 20 })
                break
            default:
                return
        }
    }

    const [, drop] = useDrop({
        accept: 'box',
        drop (item, monitor) {
            const delta = monitor.getDifferenceFromInitialOffset()
            const left = Math.round(item.left + delta.x)
            const top = Math.round(item.top + delta.y)
            moveBox(item.id, left, top)
            return undefined
        },
    })
    const moveBox = (id, left, top) => {
        dispatch({ type: id.replace(/[0-9]/g, ''), id, left, top })

    }
    const fullscreen = () => {
        let ele = document.querySelector('.charts-box')
        if (ele.requestFullscreen) {
            ele.requestFullscreen();
        } else if (ele.mozRequestFullScreen) {
            ele.mozRequestFullScreen();
        } else if (ele.webkitRequestFullscreen) {
            ele.webkitRequestFullscreen();
        } else if (ele.msRequestFullscreen) {
            ele.msRequestFullscreen();
        }
        setFullFlag(true)
    }
    function exitFullscreen () {
        if (document.exitFullScreen) {
            document.exitFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        setFullFlag(true)
    }
    return (
        <div className="charts-box">
            <DndProvider backend={HTML5Backend}>
                <div className="charts-left">
                    <Menu data={chartsType} menuClick={createChart} />
                    {
                        fullFlag
                            ?
                            <Button className="charts-left-button" onClick={exitFullscreen}><Icon type="fullscreen-exit" /></Button>
                            :
                            <Button className="charts-left-button" onClick={fullscreen}><Icon type="fullscreen" /></Button>
                    }
                </div>
                <div ref={drop} className="charts-middle">
                    {Object.keys(chartsObj).map(v => {
                        const { left, top, id, type } = chartsObj[v]
                        return (
                            <Chart
                                type={type}
                                key={id}
                                id={id}
                                left={left}
                                top={top}
                            >

                            </Chart>
                        )
                    })}
                </div>
                <div className="charts-right">
                    <Tabs />
                </div>
            </DndProvider>
        </div>
    )
}

export default Charts


