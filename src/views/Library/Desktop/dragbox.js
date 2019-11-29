import React from 'react'
import './index.less'
import { useDrag } from 'react-dnd'

const DragBox = (props) => {
    const { id, left, top, doubleClick } = props
    const [{ isDragging }, drag] = useDrag({
        item: { id, left, top, type: 'box' },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    })

    return (
        <span
            style={{ left, top }}
            ref={drag}
            className="span-file"
            onDoubleClick={(e) => doubleClick(e, id)}
            id={id}
        >
            <span>{id}</span>
        </span>
    )
}

export default DragBox