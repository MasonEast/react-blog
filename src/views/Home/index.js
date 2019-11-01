import React, { Component } from 'react';
import { connect } from 'react-redux'
import './index.less'
import { Tag } from 'antd'
import { Link } from 'dva/router';

class Home extends Component {

    state = {
        tags: {}
    }
    async componentDidMount () {
        await this.props.getBlogs({ method: 'get' })
        console.log(1111, this.props.app.blogs)
        let tags = {}
        this.props.app.blogs.forEach(item => {
            if (item.tags.length) {
                item.tags.forEach(tag => {
                    if (tags[tag]) {
                        tags[tag] += 1
                    } else {
                        tags[tag] = 1
                    }
                })
            }
        })
        this.setState({ tags })
    }



    render () {
        const { blogs } = this.props.app
        const { tags } = this.state
        return (
            <div className="home-box">
                <div className="home-box-left">
                    {
                        blogs.length && blogs.map(v => {
                            return (
                                <Link key={v._id} to={{
                                    pathname: `/blog/${v._id}`,
                                    query: v._id
                                }}>
                                    <section className="me-section">
                                        <h2 className="me-title">{v.title}</h2>
                                        <content className="me-detail">
                                            {v.content}
                                        </content>
                                        <p className="me-submitTime">posted by {v.author} on 2019</p>
                                    </section>
                                </Link>
                            )
                        })
                    }
                </div>
                <div className="home-box-right">
                    <h4 style={{ marginBottom: 16 }}>MY TAGS:</h4>
                    <div>
                        {
                            Object.keys(tags).map(v => {
                                //实现随机颜色
                                return <Tag color={'#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6)} key={v}>
                                    {v}({tags[v]})
                                       </Tag>
                            })
                        }

                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    ({ home, app }) => ({ home, app }),
    dispatch => ({
        getBlogs: payload => dispatch({ type: 'app/getBlogs', payload }),                    //获取博客数据
    })
)(Home);
