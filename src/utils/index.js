import axios from 'axios'
import { message } from 'antd';
import marked from 'marked'

function alertMsg (value) {
    if (!value.status) {
        return message.success(value.msg);
    }
    return message.error(value.msg);

}

export async function request (params = {}) {
    const data = params.data || ''
    const method = params.method || 'get'
    const url = params.url || '/'
    if (method === 'post') {
        let formdata = new FormData()
        Object.keys(data).forEach(item => formdata.append(item, data[item]))

        let res = await axios({
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            url,
            data: formdata || ''
        })

        alertMsg(res.data)
        return res.data
    }
    let res = await axios({
        method,
        url,
        params: data
    })
    return res.data
}

export function dateChange (value) {
    let monthsInEng = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let date = new Date(value);
    return monthsInEng[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
}



// 转化 md 语法为 html
export const translateMarkdown = (plainText, isGuardXss = false) => {
    return marked(isGuardXss ? xss(plainText) : plainText, {
        renderer: new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: true,
        smartLists: true,
        smartypants: true,
        highlight: function (code) {
            /*eslint no-undef: "off"*/
            return hljs.highlightAuto(code).value
        }
    })
}



