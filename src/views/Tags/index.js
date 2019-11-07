import { Timeline } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import './index.less'
import { dateChange } from '@/utils'
import { Link } from 'dva/router'

const Tags = (props) => {
    const [tagsAll, setTagsAll] = useState([])
    useEffect(() => {
        setTagsAll(props.app.blogs.filter(item => {
            return item.status === 0 && item.tags.includes(props.location.query)
        }))
    }, [props.app.blogs, props.location.query])

    return (

        <div className="tags-box">
            <Timeline className="tags-box-timeline">
                {tagsAll.map(item => {
                    return (
                        <Timeline.Item key={item._id}>Create
                            <Link to={`/blog/${item._id}`}> {item.title} </Link>
                            on {dateChange(item.date)}</Timeline.Item>
                    )
                })}
            </Timeline>
        </div>

    )
}

export default connect(
    ({ app }) => ({ app })
)(Tags)
