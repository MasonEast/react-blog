import './typeWriting.less'
import Pinyin from 'pinyin'

class TypeWriting {
    constructor({ content, data, type = 'text', speed = 200 }) {
        content.classList.add('cursorPoint')
        this.content = content
        this.data = data
        this.type = type
        this.speed = speed

    }
    writing (index = 0) {
        let data = this.data
        let pinyinData = Pinyin(data)
        let arr = data.split('')
        if (index < arr.length) {
            switch (this.type) {
                case 'pinyin':
                    this.content.innerHTML += `${arr[index]}<sup>(${pinyinData[index]})</sup>`
                    break
                case 'animation':
                    this.content.innerHTML = this.content.innerHTML.replace(/span-animation/g, '') + `<span class="span-animation">${arr[index]}</span>`
                    break
                case 'leftAnimation':
                    this.content.innerHTML = this.content.innerHTML.replace(/span-animationleft/g, '') + `<span class="span-animationleft">${arr[index]}</span>`
                    break
                case 'bottomAnimation':
                    this.content.innerHTML = this.content.innerHTML.replace(/span-animationbottom/g, '') + `<span class="span-animationbottom">${arr[index]}</span>`
                    break
                default:
                    this.content.innerHTML += `${arr[index]}`
            }

            setTimeout(this.writing.bind(this), this.speed, ++index)
        }
    }
}

export default TypeWriting
