import React from 'react'
import './index.less'


let isDraw: boolean = false
const Paint: React.FC = () => {

    const [canvas2D, setCanvas2D] = React.useState<CanvasRenderingContext2D | null>()

    const mouseEvent = (e: React.MouseEvent) => {
        console.log(isDraw)
        e.persist()
        if (e.type === 'mousedown') {
            isDraw = true
        }
        if (e.type === 'mousemove' && isDraw) {
            // e.pageX - window.offsetLeft, e.pageY - this.offsetTop
            console.log('draw')
            canvas2D!.strokeStyle = "black";
            canvas2D!.fillStyle = 'blue';
            canvas2D!.lineJoin = "round";
            canvas2D!.lineWidth = 5;
            canvas2D!.beginPath();
            canvas2D!.moveTo(e.pageX, e.pageY);
            canvas2D!.lineTo(e.pageX + 10, e.pageY + 10);
            canvas2D!.closePath();
            canvas2D!.stroke();

        }
        if (e.type === 'mouseup') {
            isDraw = false
        }
        console.log(e)
    }

    React.useEffect(() => {
        paintFunc('canvas')
        setCanvas2D(document.querySelector<HTMLCanvasElement>(`#canvas`)!.getContext('2d'))
    }, [])
    return (
        <>
            <canvas
                id="canvas"
                onMouseDown={mouseEvent}
                onMouseMove={(e) => mouseEvent(e)}
                onMouseUp={mouseEvent}
            ></canvas>
        </>
    )
}

function paintFunc(id: string) {
    let canvas = document.querySelector<HTMLCanvasElement>(`#${id}`)!
    let ctx = canvas.getContext('2d')
    let width = window.innerWidth;
    let height = window.innerHeight;
    ctx!.canvas.width = width;
    ctx!.canvas.height = height;
    console.log(ctx, canvas)
}

export default Paint