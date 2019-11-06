import axios from 'axios'
import { message } from 'antd';
import qs from 'qs'
function alertMsg (value) {
    if (!value) {
        return message.success('success');
    }
    return message.error('error');

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
    let res = await axios({
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        url,
        params: params.data || ''
    })
    alertMsg(res.data.status)
    console.log(res)
    return res.data.data
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

    alertMsg(res.data.status)
    return res

}

export function dateChange (value) {
    let monthsInEng = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let date = new Date(value);
    return monthsInEng[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
}



