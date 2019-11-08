import React, { Component } from 'react';
import { connect } from 'dva'
import './index.less'
import { translateMarkdown, dateChange, request } from '@/utils'
import { requestURL } from '@/config'
import { Tag } from 'antd'
import BlogAchor from '@/components/anchor'
import '@/assets/css/markdown.less'

class Blog extends Component {
    state = {
        data: {}
    }
    componentDidMount () {
        request({ data: { id: this.props.match.params.id }, url: requestURL.blog }).then(res => {
            console.log(res)
            this.setState({
                data: res.data
            })
        })
    }
    render () {
        const { app, match } = this.props
        // let item = app.blogs.find(v => v._id === match.params.id)
        let item = this.state.data
        let content = item.content ? translateMarkdown(item.content) : ''
        return (
            <div>
                {
                    item.content && <div className="blog-box">
                        <div className="blog-box-content">
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
                            <div className="blog-author">posted by {item.author} on {dateChange(item.date)}</div>
                            <p className="blog-content" dangerouslySetInnerHTML={{ __html: content }}></p>
                        </div>
                        <div className="blog-box-anchor">
                            <BlogAchor data={content} />
                        </div>
                    </div>

                }
            </div>
        )
    }
}

export default connect(
    ({ app }) => ({ app })
)(Blog)
