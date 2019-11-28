import React, { useState } from 'react';
import TypeWrting from './typeWriting'
import { Input, Button } from 'antd'
import './index.less'

const data = '现在开始是晚了点，但是总比明天早点......'

const TypeArea = () => {

    const headRef = React.createRef()
    const testRef = React.createRef()
    const [text, setText] = useState('')
    const [speed, setSpeed] = useState(200)
    const [type, setType] = useState('text')

    React.useEffect(() => {
        let res = new TypeWrting({ content: headRef.current, data, })
        res.writing()
    }, [headRef])

    const writeClick = () => {
        testRef.current.innerHTML = ''
        let res = new TypeWrting({ content: testRef.current, data: text, speed, type })
        res.writing()
    }

    const inputChange = (e) => {
        e.persist()
        setText(e.target.value)
    }

    const speedChange = e => {
        e.persist()
        setSpeed(e.targe.value)
    }

    return (
        <div className="text-area">
            <div ref={headRef}></div>
            <Input value={text} onChange={e => inputChange(e)} placeholder="请输入一段文本~" />
            <div className="text-speed">
                <Button onClick={() => setSpeed(50)}>极快</Button>
                <Button onClick={() => setSpeed(200)}>快</Button>
                <Button onClick={() => setSpeed(500)}>慢</Button>
                <Input onChange={e => speedChange(e)} placeholder="请输入打字速度（单位: ms）" />
            </div>
            <div className="text-animation">
                <Button onClick={() => setType('pinyin')}>拼音（要求汉字）</Button>
                <Button onClick={() => setType('animation')}>动画</Button>
                <Button onClick={() => setType('leftAnimation')}>左动画</Button>
                <Button onClick={() => setType('bottomAnimation')}>下动画</Button>
            </div>
            <Button onClick={writeClick}>查看打字效果</Button>
            <div className="text-view" ref={testRef}></div>

        </div>

    )
}

export default TypeArea
