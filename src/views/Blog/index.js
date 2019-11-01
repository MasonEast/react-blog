import React, { Component } from 'react';
import { connect } from 'dva'
import './index.less'
class Blog extends Component {

    render () {
        const { app, location } = this.props
        let item = app.blogs.find(v => v._id === location.query)
        return (
            <div className="blog-box">
                <h1>{item.title}</h1>
                <div className="blog-author">{item.author}</div>
                <p className="blog-content">{item.content}</p>
            </div>
        )
    }
}

export default connect(
    ({ app }) => ({ app })
)(Blog)