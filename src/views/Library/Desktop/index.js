import React, { useReducer, useState, useEffect, useRef } from 'react'
import './index.less'
import { DndProvider, useDrop } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { reducer, initalState } from './database'
import DragBox from './dragbox'
import { Modal, Input } from 'antd';
import formatDate from './formdata'


const Desktop = () => {

    const [showModal, setShowModal] = useState(false)
    const [showMouseMenu, setShowMouseMenu] = useState({
        flag: false,
        left: 0,
        top: 0
    })
    const [showFileMenu, setShowFileMenu] = useState({
        flag: false,
        left: 0,
        top: 0
    })
    const [data, dispatch] = useReducer(reducer, initalState)
    const [nowTime, setNowTime] = useState('')

    const [, drop] = useDrop({                                  //通过ref创建拖拽区域， 并定义拖拽方法
        accept: 'box',
        drop (item, monitor) {
            const delta = monitor.getDifferenceFromInitialOffset()
            const left = Math.round(item.left + delta.x)
            const top = Math.round(item.top + delta.y)
            moveBox(item.id, left, top)
            return undefined
        },
    })
    const moveBox = (id, left, top) => {                      //拖拽后改变state对应id的盒子的位置
        dispatch({ type: 'move', id, left, top })
    }

    useEffect(() => {
        let timer = setInterval(function () {
            // 获取当前时间
            let now = new Date()
            // 格式化当前时间
            let nowTimeStr = formatDate(new Date(now.getTime() - 1000), 'hhiiss')
            setNowTime(nowTimeStr.substr(0, 2) + ':' + nowTimeStr.substr(2, 2) + ':' + nowTimeStr.substr(4, 2))
        }, 1000)

        return () => {
            clearInterval(timer)
        }                //当组件销毁时清除定时器
    }, [])

    const dragboxClick = () => {

    }

    const dragboxDoubleClick = (e, id) => {
        setShowModal(!showModal)
    }
    const handleClick = () => {
        setShowMouseMenu({ ...showMouseMenu, flag: false })
    }

    const createNewFile = () => {
        const { left, top } = showMouseMenu
        const len = Object.keys(data).filter(item => item.includes('未命名文件夹')).length
        console.log(left)
        dispatch({ type: 'create', id: len ? `未命名文件夹(${len})` : '未命名文件夹', left: +left.replace(/px/, ''), top: +top.replace('px', '') })
    }

    const handleContextMenu = (e) => {
        e.preventDefault()
        e.persist()
        if (e.target.className === 'desktop-box') {
            setShowFileMenu((showFileMenu) => ({ ...showFileMenu, flag: false }))
            setShowMouseMenu((showMouseMenu) => ({ ...showMouseMenu, flag: true }))
        } else {
            setShowMouseMenu((showMouseMenu) => ({ ...showMouseMenu, flag: false }))
            setShowFileMenu((showFileMenu) => ({ ...showFileMenu, flag: true }))

        }

        // clientX/Y 获取到的是触发点相对于浏览器可视区域左上角距离
        const clickX = e.clientX - document.querySelector('.desktop-box').offsetLeft
        const clickY = e.clientY - 100
        // window.innerWidth/innerHeight 获取的是当前浏览器窗口的视口宽度/高度
        const screenW = window.innerWidth - document.querySelector('.desktop-box').offsetLeft
        const screenH = window.innerHeight - 100
        // 获取自定义菜单的宽度/高度
        const rootW = 100
        const rootH = 300

        // right为true，说明鼠标点击的位置到浏览器的右边界的宽度可以放下菜单。否则，菜单放到左边。
        // bottom为true，说明鼠标点击位置到浏览器的下边界的高度可以放下菜单。否则，菜单放到上边。
        const right = (screenW - clickX) > rootW
        const left = !right
        const bottom = (screenH - clickY) > rootH
        const top = !bottom

        if (right) {
            setShowMouseMenu((showMouseMenu) => ({ ...showMouseMenu, left: `${clickX}px` }))
            // menuRef.current.style.left = `${clickX}px`
        }

        if (left) {
            setShowMouseMenu((showMouseMenu) => ({ ...showMouseMenu, left: `${clickX - rootW}px` }))
            // menuRef.current.style.left = `${clickX - rootW}px`
        }

        if (bottom) {
            setShowMouseMenu((showMouseMenu) => ({ ...showMouseMenu, top: `${clickY}px` }))
            // menuRef.current.style.top = `${clickY}px`
        }
        if (top) {
            setShowMouseMenu((showMouseMenu) => ({ ...showMouseMenu, top: `${clickY - rootH}px` }))
            // menuRef.current.style.top = `${clickY - rootH}px`
        }
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div
                ref={drop}
                className="desktop-box"
                onContextMenu={handleContextMenu}
                onClick={handleClick}
            >
                {Object.keys(data).map(item => {
                    const { left, top, id, type } = data[item]
                    return <DragBox
                        left={left}
                        top={top}
                        id={id}
                        key={id}
                        doubleClick={dragboxDoubleClick}
                        click={dragboxClick}
                    />
                })}
                <div className="desktop-footer">
                    <span className="desktop-footer-window"></span>
                    <span className="desktop-footer-input"><Input /></span>
                    <span className="desktop-footer-time">{nowTime}</span>
                </div>
                <Modal
                    title="Basic Modal"
                    visible={showModal}
                    onCancel={dragboxDoubleClick}
                    mask={false}
                    width='60%'
                    footer={null}
                    style={{ border: 0 }}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
                {
                    showMouseMenu.flag &&
                    <ul
                        style={{ left: showMouseMenu.left, top: showMouseMenu.top }}
                        className="mouse-menu"
                    >
                        <li onClick={createNewFile}>新建文件夹</li>
                        <li>新建文件</li>
                        <li>1</li>
                    </ul>
                }
                {
                    showFileMenu.flag &&
                    <ul
                        style={{ left: showFileMenu.left, top: showFileMenu.top }}
                        className="mouse-menu"
                    >
                        <li onClick={createNewFile}>重命名</li>
                        <li>详情</li>
                        <li>删除</li>
                    </ul>
                }
            </div>
        </DndProvider>
    )
}

export default Desktop
