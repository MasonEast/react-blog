import React from 'react'
import './index.less'
import classNames from 'classnames'
import { GithubPicker, ColorResult } from 'react-color'
import '@/assets/icon/iconfont.css'
interface Iprops {

}

type T = Array<number>
interface Istate {
    color: string,
    active: string,
    canvas?: any,
    canvasURL: Array<string>,
    isDraw: boolean,
    locationArr: Array<T>
}
export default class Paint extends React.Component<Iprops, Istate> {
    private defaultProps: Partial<Iprops> = {};

    constructor(props: Iprops) {
        super(props)
        this.state = {
            color: 'black',
            active: 'pen',
            canvasURL: [],
            isDraw: false,
            locationArr: []
        }
    }

    private setActive(e: any) {
        e.persist()
        this.setState({
            active: e.target.innerHTML
        })
    }

    private recallClick() {
        const { canvas, canvasURL } = this.state
        let ctx = canvas!.getContext('2d')
        let step = canvasURL.length - 1
        if (step >= 0) {
            step--;
            ctx!.clearRect(0, 0, 1000, 1000);
            let canvasPic = new Image();
            canvasPic.src = canvasURL[step];
            canvasPic.addEventListener('load', () => {
                ctx!.drawImage(canvasPic, 0, 0);
            });
            canvasURL.pop()
            this.setState({
                canvasURL
            })
        } else {
            console.log('不能再继续撤销了');
        }
    }

    private downloadImg() {
        let url = this.state.canvas.toDataURL('image/png');
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.href = url;
        a.download = '我的绘画';
        a.target = '_blank';
        a.click();
    }

    private mouseEvent(e: React.MouseEvent) {
        const { canvas, active, color, isDraw, locationArr } = this.state
        let ctx = canvas.getContext('2d')
        let mm = document.querySelector('.admin-box') as HTMLElement

        e.persist()
        if (e.type === 'mousedown') {
            switch (active) {
                case 'spray':
                    return canvas.style.backgroundColor = color
                default:
                    this.setState({
                        isDraw: true,
                        locationArr: []
                    })
                    return
            }

        }
        if (e.type === 'mousemove' && isDraw) {
            locationArr.push([e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop - 100])

            switch (active) {
                case 'pen':
                    ctx.strokeStyle = color
                    ctx.lineJoin = "round";
                    ctx.lineWidth = 5;
                    ctx.beginPath();
                    locationArr.length > 1 && ctx.moveTo(locationArr[locationArr.length - 2][0], locationArr[locationArr.length - 2][1]);
                    ctx.lineTo(locationArr[locationArr.length - 1][0], locationArr[locationArr.length - 1][1]);
                    ctx.closePath();
                    ctx.stroke();  //描边
                    return
                case 'eraser':
                    ctx.strokeStyle = canvas.style.backgroundColor || '#ccc'
                    ctx.lineJoin = "round";
                    ctx.lineWidth = 50;
                    ctx.beginPath();
                    locationArr.length > 1 && ctx.moveTo(locationArr[locationArr.length - 2][0], locationArr[locationArr.length - 2][1]);
                    ctx.lineTo(locationArr[locationArr.length - 1][0], locationArr[locationArr.length - 1][1]);
                    ctx.closePath();
                    ctx.stroke();  //描边
                    return
                case 'rectangle':
                    let left = locationArr[0][0]
                    let top = locationArr[0][1]
                    let prewidth = locationArr.length > 1 && locationArr[locationArr.length - 2][0] - left
                    let preheight = locationArr.length > 1 && locationArr[locationArr.length - 2][1] - top
                    let width = locationArr[locationArr.length - 1][0] - left
                    let height = locationArr[locationArr.length - 1][1] - top
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
            let { canvasURL, canvas } = this.state
            canvasURL.push(canvas.toDataURL())
            this.setState({
                canvasURL,
                isDraw: false
            })
        }

    }

    componentDidMount() {
        this.setState({
            canvas: document.querySelector(`#canvas`)
        })
    }

    render() {
        const { color, active, canvas } = this.state
        return (
            <div className="paint-box">

                <div>
                    <GithubPicker width="500px" color={color} onChange={(value: ColorResult) => this.setState({
                        color: value.hex
                    })} />
                </div>
                <div className="paint-right">
                    <ul onClick={this.setActive.bind(this)}>
                        <li className={classNames({ 'active': active === 'pen' })}><i className="iconfont icon-bianjixiugaiqianbishuxie">pen</i></li>
                        <li className={classNames({ 'active': active === 'eraser' })}><i className="iconfont icon-xiangpica">eraser</i></li>
                        <li className={classNames({ 'active': active === 'spray' })}><i className="iconfont icon-youqitong">spray</i></li>
                        <li className={classNames({ 'active': active === 'rectangle' })}><i className="iconfont icon-juxing">rectangle</i></li>
                        <li onClick={this.recallClick.bind(this)} className={classNames({ 'active': active === 'recall' })}><i className="iconfont icon-chexiao">recall</i></li>
                        <li onClick={this.downloadImg.bind(this)} className={classNames({ 'active': active === 'download' })}><i className="iconfont icon-baocun1">download</i></li>
                    </ul>
                </div>
                <canvas
                    id="canvas"
                    width={window.innerWidth - 260}
                    height={window.innerHeight - 300}
                    onMouseDown={this.mouseEvent.bind(this)}
                    onMouseMove={this.mouseEvent.bind(this)}
                    onMouseUp={this.mouseEvent.bind(this)}
                ></canvas>

            </div>
        )
    }
}