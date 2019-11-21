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
    const [select, setSelect] = React.useState({})

    const [chartsObj, dispatch] = React.useReducer((state, action) => {
        const { id, left, top, active, type, width, height, view, value } = action
        if (type === 'move') {
            return { ...state, [id]: { ...state[id], left, top } }
        }
        if (type === "delete") {
            delete state[id]
            return { ...state }
        }
        if (type === 'activeClass') {
            Object.keys(state).map(item => {
                if (item === id) {
                    state[item].active = true
                    return item
                }
                state[item].active = false
                return item
            })
            return { ...state }
        }
        if (type === 'changeview') {
            return { ...state, [id]: { ...state[id], [view]: value } }
        }
        return { ...state, [id]: { id, type, active, left, top, width, height } }
    }, {});

    const createChart = (item) => {
        switch (item.key) {
            case "lineBasic":
                dispatch({ type: 'lineBasic', id: `lineBasic${Object.keys(chartsObj).length}`, active: false, left: 20, top: 20, width: 300, height: 250 })
                break
            case "barBasic":
                dispatch({ type: 'barBasic', id: `barBasic${Object.keys(chartsObj).length}`, left: 20, top: 20, width: 300, height: 250 })
                break
            case "pieBasic":
                dispatch({ type: 'pieBasic', id: `pieBasic${Object.keys(chartsObj).length}`, left: 20, top: 20, width: 300, height: 250 })
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
        dispatch({ type: 'move', id, left, top })

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
    const exitFullscreen = () => {
        if (document.exitFullScreen) {
            document.exitFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        setFullFlag(false)
    }

    const deleteChart = (id) => {

        dispatch({ type: 'delete', id })
    }

    const selectChart = (id) => {
        setSelect(chartsObj[id])
        dispatch({ type: "activeClass", id })
    }

    const changeView = (value, id, type, view) => {
        setSelect(pre => ({ ...pre, [view]: value }))
        dispatch({ type, value, id, view })
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
                        const { left, top, id, type, active, width, height } = chartsObj[v]
                        return (
                            <Chart
                                type={type}
                                key={id}
                                id={id}
                                left={left}
                                top={top}
                                width={width}
                                height={height}
                                active={active}
                                deleteChart={deleteChart}
                                selectChart={selectChart}
                            >

                            </Chart>
                        )
                    })}
                </div>
                <div className="charts-right">
                    <Tabs
                        changeView={changeView}
                        select={select}
                    />
                </div>
            </DndProvider>
        </div>
    )
}

export default Charts


