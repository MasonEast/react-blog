import React, { Component } from 'react';
import { Table, Divider, Tag } from 'antd';
import { connect } from 'react-redux'
import { Link } from 'dva/router'
import { request } from '@/utils'
import { requestURL } from '@/config'
class Blogmanage extends Component {
    constructor() {
        super(...arguments)
        this.state = {
            columns: [
                {
                    title: 'Title',
                    dataIndex: 'title',
                    key: 'title',
                    render: (text, record) => <Link to={`/blog/${record.key}`}>{text}</Link>,
                },
                {
                    title: 'Author',
                    dataIndex: 'author',
                    key: 'author',
                },
                {
                    title: 'Date',
                    dataIndex: 'date',
                    key: 'date',
                },
                {
                    title: 'Tags',
                    key: 'tags',
                    dataIndex: 'tags',
                    render: tags => (
                        <span>
                            {tags.map(tag => {
                                let color = tag.length > 5 ? 'geekblue' : 'green';
                                if (tag === 'loser') {
                                    color = 'volcano';
                                }
                                return (
                                    <Tag color={color} key={tag}>
                                        {tag.toUpperCase()}
                                    </Tag>
                                );
                            })}
                        </span>
                    ),
                },
                {
                    title: 'Action',
                    key: 'action',
                    render: (text, record) => (
                        <span>
                            <a onClick={this.goDraft.bind(this, record)}>Edit {record.name}</a>
                            <Divider type="vertical" />
                            <a onClick={this.deleteBlog.bind(this, record)}>Delete</a>
                        </span>
                    ),
                },
            ],
            data: []
        }
    }
    deleteBlog = (record) => {
        request({ data: { id: record.key, tags: record.tags.join('，') }, url: requestURL.blog + `/${record.key}`, method: 'delete' })
        this.props.getBlogs({ url: requestURL.blog })
    }
    goDraft (record) {
        console.log(record)
        let content = this.props.app.blogs.find(item => item._id === record.key).content
        this.props.history.push({
            pathname: 'blogwrite',
            state: { record, content }
        })
        console.log(this.props)
    }
    componentDidMount () {
        this.props.getBlogs({ url: requestURL.blog })
    }

    render () {
        let isManage = /blogmanage/.test(this.props.location.pathname) ? 0 : 1
        const { blogs, user } = this.props.app
        const data = blogs.filter(item => item.author === user.email && item.status === isManage).map(item => {
            return {
                key: item._id,
                title: item.title,
                author: item.author,
                date: new Date(item.date).toLocaleDateString().replace(/\//g, '-'),
                tags: item.tags
            }
        })
        return (
            <div>
                <Table
                    columns={this.state.columns}
                    dataSource={data}
                    locale={{
                        emptyText: user.email ? '你还没有blog嘞' : '登录之后才能查看自己的blog哦~'
                    }}
                />
            </div>
        )
    }
}

export default connect(
    ({ app }) => ({ app }),
    dispatch => ({
        getBlogs: payload => dispatch({ type: 'app/getBlogs', payload }),                    //获取博客数据
    })
)(Blogmanage)
