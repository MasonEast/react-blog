import './typeWriting.less'
import Pinyin from 'pinyin'

class TypeWriting {
    constructor({ content, data }) {
        content.classList.add('cursorPoint')
        this.content = content
        this.data = data
    }
    writing (index = 0) {
        let data = this.data
        let pinyinData = Pinyin(data)
        // console.log(Pinyin(data))
        let arr = data.split('')
        if (index < arr.length) {
            this.content.innerHTML += `${arr[index]}<sup>(${pinyinData[index]})</sup>`
            setTimeout(this.writing.bind(this), 200, ++index)
        }
    }
}

export default TypeWriting
