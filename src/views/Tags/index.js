import { Timeline } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'

const Tags = (props) => {
    const [tagsAll, setTagsAll] = useState([])
    useEffect(() => {
        setTagsAll(props.app.blogs.filter(item => {
            return item.tags && item.tags.includes(props.location.query)
        }))
    }, [props.app.blogs, props.location.query])

    return (

        <Timeline>
            {tagsAll.map(item => {
                return (
                    <Timeline.Item key={item._id}>Create {item.title} 2015-09-01</Timeline.Item>
                )
            })}

        </Timeline>

    )
}

export default connect(
    ({ app }) => ({ app })
)(Tags)
