import { Timeline, Icon, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import './index.less'
import { dateChange, request } from '@/utils'
import { requestURL } from '@/config'
import { Link } from 'dva/router'



const Tags = (props) => {
    const [lineData, setlineData] = useState([])
    const [tags, setTags] = useState([])

    function getLineData (e) {
        // e.persist()
        // request({ data: { tag: e.target.innerHTML }, url: requestURL.blog }).then(res => {
        //     setlineData(res.data)
        // })
        props.history.push(`/tags/${e.target.innerHTML}`)
    }
    useEffect(() => {

        request({ data: { tag: props.location.pathname.replace(/\/tags\/?/, '') }, url: requestURL.blog }).then(res => {
            setlineData(res.data)
        })
        request({ url: requestURL.tags }).then(res => {
            let tags = res.data.map(item => ({ tag: item.tag, number: item.number }))
            setTags(tags)
        })
    }, [props.location.pathname])

    return (

        <div className="tags-box">
            <div className="tags-box-header">
                {
                    tags.map(v => {
                        //实现随机颜色
                        return (

                            <span key={v.tag} className="tags-box-header-item">
                                <Tag

                                    onClick={e => getLineData(e)}
                                    className="tags-box-header-tag"
                                    color={'#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6)}
                                >
                                    {v.tag}
                                </Tag>
                                <sup>{v.number}</sup>
                            </span>

                        )
                    })
                }
            </div>
            <Timeline mode="alternate" className="tags-box-timeline">
                <Timeline.Item dot={<Icon style={{ color: 'red' }} type="smile" />}>
                    That's cool!   There are  <span style={{ color: 'red', fontSize: 30 }} className="cool-tag-span">{lineData.length}</span> pieces of data ~~
                </Timeline.Item>
                {lineData.map(item => {
                    return (
                        <Timeline.Item key={item._id}>{item.author} Create
                            <Link to={`/blog/${item._id}`}> {item.title} </Link>
                            on {dateChange(item.date)}
                        </Timeline.Item>
                    )
                })}
            </Timeline>
        </div>

    )
}

export default connect(
    ({ app }) => ({ app })
)(Tags)
