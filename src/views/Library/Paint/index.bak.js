import React from 'react'
import './index.less'
import classNames from 'classnames'
import { GithubPicker } from 'react-color'
import '@/assets/icon/iconfont.css'

let isDraw = false, arr = []
const Paint = () => {

    const [canvas2D, setCanvas2D] = React.useState()
    const [active, setActive] = React.useState('pen')
    const [color, setColor] = React.useState('black')
    const [canvasUrl, setCanvasUrl] = React.useState([])

    const downloadImg = () => {
        var url = canvas2D.toDataURL('image/png');
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.href = url;
        a.download = '我的绘画';
        a.target = '_blank';
        a.click();
    }

    const recallClick = (e) => {
        let ctx = canvas2D.getContext('2d')
        let step = canvasUrl.length - 1
        if (step >= 0) {
            step--;
            ctx.clearRect(0, 0, 1000, 1000);
            let canvasPic = new Image();
            canvasPic.src = canvasUrl[step];
            canvasPic.addEventListener('load', () => {
                ctx.drawImage(canvasPic, 0, 0);
            });

            setCanvasUrl(canvasUrl => {
                canvasUrl.pop()
                return canvasUrl
            })
        } else {
            console.log('不能再继续撤销了');
        }

    }

    const mouseEvent = (e) => {
        let ctx = canvas2D.getContext('2d')

        e.persist()
        if (e.type === 'mousedown') {
            switch (active) {
                case 'spray':
                    return canvas2D.style.backgroundColor = color
                default:
                    isDraw = true
                    arr = []
                    return
            }

        }
        if (e.type === 'mousemove' && isDraw) {
            arr.push([e.pageX - canvas2D.offsetLeft, e.pageY - document.querySelector('.admin-box').offsetTop - 40])

            switch (active) {
                case 'pen':
                    ctx.strokeStyle = color
                    ctx.lineJoin = "round";
                    ctx.lineWidth = 5;
                    ctx.beginPath();
                    arr.length > 1 && ctx.moveTo(arr[arr.length - 2][0], arr[arr.length - 2][1]);
                    ctx.lineTo(arr[arr.length - 1][0], arr[arr.length - 1][1]);
                    ctx.closePath();
                    ctx.stroke();  //描边
                    return
                case 'eraser':
                    ctx.strokeStyle = canvas2D.style.backgroundColor || '#ccc'
                    ctx.lineJoin = "round";
                    ctx.lineWidth = 50;
                    ctx.beginPath();
                    arr.length > 1 && ctx.moveTo(arr[arr.length - 2][0], arr[arr.length - 2][1]);
                    ctx.lineTo(arr[arr.length - 1][0], arr[arr.length - 1][1]);
                    ctx.closePath();
                    ctx.stroke();  //描边
                    return
                case 'rectangle':
                    let left = arr[0][0]
                    let top = arr[0][1]
                    let prewidth = arr.length > 1 && arr[arr.length - 2][0] - left
                    let preheight = arr.length > 1 && arr[arr.length - 2][1] - top
                    let width = arr[arr.length - 1][0] - left
                    let height = arr[arr.length - 1][1] - top
                    ctx.beginPath();
                    ctx.lineWidth = "6";
                    ctx.strokeStyle = "red";
                    ctx.clearRect(left, top, prewidth, preheight)
                    ctx.strokeRect(left, top, width, height);
                    return
                default:
                    return
            }

        }
        if (e.type === 'mouseup') {
            setCanvasUrl(url => {
                url.push(canvas2D.toDataURL())
                return url
            })
            isDraw = false
        }
    }

    React.useEffect(() => {
        paintFunc('canvas')
        setCanvas2D(document.querySelector(`#canvas`))
    }, [])
    return (
        <div className="paint-box">

            <div>
                <GithubPicker width="500px" color={color} onChange={(value) => setColor(value.hex)} />
            </div>
            <div className="paint-right">
                <ul onClick={e => {
                    e.persist()
                    setActive(e.target.innerHTML)
                }}>
                    <li className={classNames({ 'active': active === 'pen' })}><i className="iconfont icon-bianjixiugaiqianbishuxie">pen</i></li>
                    <li className={classNames({ 'active': active === 'eraser' })}><i className="iconfont icon-xiangpica">eraser</i></li>
                    <li className={classNames({ 'active': active === 'spray' })}><i className="iconfont icon-youqitong">spray</i></li>
                    <li className={classNames({ 'active': active === 'rectangle' })}><i className="iconfont icon-juxing">rectangle</i></li>
                    <li onClick={recallClick} className={classNames({ 'active': active === 'recall' })}><i className="iconfont icon-chexiao">recall</i></li>
                    <li onClick={downloadImg} className={classNames({ 'active': active === 'download' })}><i className="iconfont icon-baocun1">download</i></li>
                </ul>
            </div>
            <canvas
                id="canvas"
                onMouseDown={mouseEvent}
                onMouseMove={(e) => mouseEvent(e)}
                onMouseUp={mouseEvent}
            ></canvas>
            
        </div>
    )
}

function paintFunc (id) {
    let canvas = document.querySelector(`#${id}`)
    let ctx = canvas.getContext('2d')
    let width = window.innerWidth - canvas.offsetLeft;
    let height = window.innerHeight - 300;
    ctx.canvas.width = width;
    ctx.canvas.height = height;
}

export default Paint