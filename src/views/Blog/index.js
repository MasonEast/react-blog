import React, { Component } from 'react';
import { connect } from 'dva'
import './index.less'

import { Tag } from 'antd'
class Blog extends Component {


    render () {
        const { app, match } = this.props
        let item = app.blogs.find(v => v._id === match.params.id)

        return (
            <div className="blog-box">
                <div className="blog-tags">
                    {
                        item.tags.map(item => {
                            return (
                                <Tag key={item}>{item}</Tag>
                            )
                        })
                    }
                </div>
                <h1>{item.title}</h1>
                <div className="blog-author">{item.author}</div>
                <p className="blog-content" dangerouslySetInnerHTML={{ __html: item.content }}></p>
            </div>
        )
    }
}

export default connect(
    ({ app }) => ({ app })
)(Blog)
