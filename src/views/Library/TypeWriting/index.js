import React from 'react';
import TypeWrting from './typeWriting'
import './index.less'

const data = '改好了管理费很厉害家咯而过欧福莱不认可护理记录'

const TypeArea = () => {

    const areaRef = React.createRef()

    React.useEffect(() => {
        let res = new TypeWrting({ content: areaRef.current, data })
        res.writing()
    }, [areaRef])

    console.log(111)
    return (
        <div ref={areaRef} className="text-area"></div>
    )
}

export default TypeArea
