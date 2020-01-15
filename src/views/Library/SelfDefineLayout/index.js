import React, { useState } from 'react'
import GridLayout from 'react-grid-layout';
import './index.less'
import { Button, Row, Col, Modal } from 'antd'


const MyFirstGrid = () => {

    const dragItem = { x: 14, y: 14, w: 1, h: 1, maxH: 20 }


    const [dragObj, setDragObj] = useState({ [+ new Date()]: dragItem })
    const [layoutObj, setLayoutObj] = useState({})
    const [codeStr, setCodeStr] = useState('')
    const [modalFlag, setModalFlag] = useState(false)

    const addBlock = () => {
        setDragObj({ ...dragObj, [+ new Date()]: dragItem })
    }

    const onDragStop = (arr) => {
        onResizeStop(arr)
    }

    const onResizeStop = (arr) => {
        let obj = {}, layoutObj = {}
        arr.forEach(item => {
            obj[item['i']] = { x: item['x'], y: item['y'], w: item['w'], h: item['h'], maxH: item['maxH'] }
            if (layoutObj[item['x']]) {
                layoutObj[item['x']].push(item)
            } else {
                layoutObj[item['x']] = [item]
            }
        })
        setLayoutObj(layoutObj)
        setDragObj(obj)
    }

    const onClear = () => {
        setDragObj({ [+ new Date()]: dragItem })
    }

    const onCodeGenerator = () => {
        setCodeStr(
            '<Row>\n' + Object.keys(layoutObj).map(item => `    <Col span={${layoutObj[item][0].w * 2}} className="drag-item">
${layoutObj[item].map(subItem => `      <Col className="drag-subitem" style={{height:'${subItem.h * 5}vh'}} span={24}></Col>\n`).join('')}
    </Col>\n`
            ).join('')
            +
            '</Row>'
        )
        console.log(codeStr)
        setModalFlag(true)
    }

    const handleOk = e => {
        setModalFlag(false)
    };

    const handleCancel = e => {
        setModalFlag(false)
    };

    return (
        <>

            <div className="box">
                <GridLayout className="layout"
                    onResizeStop={onResizeStop}
                    onDragStop={onDragStop}
                    preventCollision={true}
                    margin={[0, 0]}
                    cols={12}
                    rowHeight={30}
                    width={800}
                    style={{ height: 600 }}
                >
                    {
                        Object.keys(dragObj).map(item => <div className="drag-item" style={{ backgroundColor: '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6) }} key={item} data-grid={dragObj[item]}></div>)
                    }
                </GridLayout>
                <div className="box-right">
                    <Button onClick={addBlock}>添加Block</Button>
                    <Button onClick={onCodeGenerator}>生成代码</Button>
                    <Button onClick={onClear}>清除Block</Button>
                </div>
            </div>

            <Modal
                title="Basic Modal"
                visible={modalFlag}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[]}
                width={'80vw'}
            >
                <p style={{ whiteSpace: 'pre-wrap' }}>
                    {codeStr}
                </p>
            </Modal>

        </>
    )
}

export default MyFirstGrid