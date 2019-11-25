import React from 'react';
import './index.less'
import Chart from '@/components/chartsTemplete'
// import { SortableContainer, SortableElement } from 'react-sortable-hoc';
// import arrayMove from 'array-move';

import { DndProvider, useDrop } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { Button, Icon } from 'antd'
import Menu from '@/components/chartsTemplete/menu'
import Tabs from '@/components/chartsTemplete/tab'
import lineBasicOption from '@/components/chartsTemplete/lineBasic'
import barBasicOption from '@/components/chartsTemplete/barBasic'
import pieBasicOption from '@/components/chartsTemplete/pieBasic'
import threeDbarOption from '@/components/chartsTemplete/3dbar'
import pieFourOption from '@/components/chartsTemplete/pieFour'
import chinaMoveOption from '@/components/chartsTemplete/chinaMove'
import liquidFillChartOption from '@/components/chartsTemplete/liquidFillChart'
import piePanelOption from '@/components/chartsTemplete/piePanel'

const Charts = () => {

    const chartsType = {                //主要用来展示左侧菜单栏的数据
        Line: ['lineBasic', 'liquidFillChart'],
        Bar: ['barBasic', 'threeDbar'],
        Pie: ['pieBasic', 'pieFour', 'piePanel'],
        China: ['chinaMove']
    }

    const [fullFlag, setFullFlag] = React.useState(false)       //控制是否全屏的flag
    const [select, setSelect] = React.useState({})              //获取并保存选中的图表信息

    const [chartsObj, dispatch] = React.useReducer((state, action) => {         //数据控制中心
        const { id, left, top, active, type, width, height, fatherView, view, value, option } = action

        switch (type) {
            case 'move':                                        //保存拖拽后的图表信息
                return { ...state, [id]: { ...state[id], left, top } }
            case 'delete':                                      //从数据中删除对应的图表信息
                delete state[id]
                return { ...state }
            case 'activeClass':                                 //给选中的图表添加选中的样式
                Object.keys(state).map(item => {
                    if (item === id) {
                        state[item].active = true
                        return item
                    }
                    state[item].active = false
                    return item
                })
                return { ...state }
            case 'changeview':                                  //改变图表的宽高， 位置， 保存对应的信息
                return { ...state, [id]: { ...state[id], [view]: value } }
            case 'changeOption':                                //改变图表的option样式等信息
                return { ...state, [id]: { ...state[id], 'option': value } }
            // return { ...state, [id]: { ...state[id], option: { ...state[id]['option'], [fatherView]: { ...state[id]['option'][fatherView], [view]: value } } } }
            default:                                            //默认就是创建一个对应的图表，添加到state中
                return { ...state, [id]: { id, type, active, left, top, width, height, option } }
        }

    }, {});

    const createChart = (item) => {                             //创建图表
        switch (item.key) {
            case "lineBasic":
                dispatch({ type: 'lineBasic', id: `lineBasic${Object.keys(chartsObj).length}`, active: false, left: 20, top: 20, width: 300, height: 250, option: lineBasicOption })
                break
            case "pieFour":
                dispatch({ type: 'pieFour', id: `pieFour${Object.keys(chartsObj).length}`, active: false, left: 20, top: 20, width: 300, height: 250, option: pieFourOption })
                break
            case "barBasic":
                dispatch({ type: 'barBasic', id: `barBasic${Object.keys(chartsObj).length}`, active: false, left: 20, top: 20, width: 300, height: 250, option: barBasicOption })
                break
            case "threeDbar":
                dispatch({ type: 'threeDbar', id: `threeDbar${Object.keys(chartsObj).length}`, active: false, left: 20, top: 20, width: 300, height: 250, option: threeDbarOption })
                break
            case "pieBasic":
                dispatch({ type: 'pieBasic', id: `pieBasic${Object.keys(chartsObj).length}`, active: false, left: 20, top: 20, width: 300, height: 250, option: pieBasicOption })
                break
            case "piePanel":
                dispatch({ type: 'piePanel', id: `piePanel${Object.keys(chartsObj).length}`, active: false, left: 20, top: 20, width: 300, height: 250, option: piePanelOption })
                break
            case "chinaMove":
                dispatch({ type: 'chinaMove', id: `chinaMove${Object.keys(chartsObj).length}`, active: false, left: 20, top: 20, width: 300, height: 250, option: chinaMoveOption })
                break
            case "liquidFillChart":
                dispatch({ type: 'liquidFillChart', id: `liquidFillChart${Object.keys(chartsObj).length}`, active: false, left: 20, top: 20, width: 300, height: 250, option: liquidFillChartOption })
                break
            default:
                return
        }
    }

    const [, drop] = useDrop({                                  //通过ref创建拖拽区域， 并定义拖拽方法
        accept: 'box',
        drop (item, monitor) {
            const delta = monitor.getDifferenceFromInitialOffset()
            const left = Math.round(item.left + delta.x)
            const top = Math.round(item.top + delta.y)
            moveChart(item.id, left, top)
            return undefined
        },
    })
    const moveChart = (id, left, top) => {                      //拖拽后改变state对应id的图表的位置
        dispatch({ type: 'move', id, left, top })

    }
    const fullscreen = () => {                                  //控制全屏
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
    const exitFullscreen = () => {                              //退出全屏
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

    const deleteChart = (id) => {                               //双击通知state删除对应id的图表

        dispatch({ type: 'delete', id })
    }

    const selectChart = (e, id) => {                               //设置选中图表， 并添加被选中的样式
        e.stopPropagation()
        setSelect(chartsObj[id])
        dispatch({ type: "activeClass", id })
    }

    const cancelSelect = () => {                                //取消选中样式
        setSelect({})
        dispatch({ type: "activeClass" })
    }

    const changeView = (type, value, id, view, fatherView = '') => { //右侧菜单栏改变对应图表数据的样式
        if (type === 'changeOption') {
            setSelect(pre => ({ ...pre, option: value }))
            // setSelect(pre => ({ ...pre, option: { ...pre['option'], [fatherView]: { ...pre['option'][fatherView], [view]: value } } }))
        } else {
            setSelect(pre => ({ ...pre, [view]: value }))

        }
        dispatch({ type, value, id, fatherView, view })
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
                <div ref={drop} className="charts-middle" onClick={cancelSelect}>
                    {Object.keys(chartsObj).map(v => {
                        const { left, top, id, type, active, width, height, option } = chartsObj[v]
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
                                option={option}
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


