import axios from 'axios'
import { message } from 'antd';

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


export async function queryData (params, url) {
    let res = await axios({
        method: params.method || 'post',
        url,
        data: params.data || ''
    })
    return res.data.data
}

export async function deleteData (params, url) {
    console.log('axios')
    let res = await axios({
        method: 'delete',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        url,
        params: params.data || ''
    })
    console.log(res)
    return res.data.data
}

export async function submitData (params, url) {
    let data = params.data
    let formdata = new FormData()
    formdata.append('title', data.title)
    formdata.append('author', data.author)
    formdata.append('tags', data.tags)
    formdata.append('status', data.status)
    formdata.append('content', data.content)

    let res = await axios({
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        url,
        data: formdata || ''
    })
    console.log(res)

    alertMsg(res.data)
    return res
}

export async function login (params, url) {
    let data = params.data
    let formdata = new FormData()
    formdata.append('email', data.email)
    formdata.append('password', data.password)
    let res = await axios({
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        url,
        data: formdata || ''
    })
    console.log(res)

    alertMsg(res.data)
    return res

}

export function dateChange (value) {
    let monthsInEng = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let date = new Date(value);
    return monthsInEng[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
}



