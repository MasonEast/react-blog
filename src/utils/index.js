import axios from 'axios'
import Qs from 'qs'

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
    console.log('axios')
    let res = await axios({
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        url,
        params: params.data || ''
    })
    console.log(res)
    return res.data.data
}