/*
 * @Description: 
 * @Date: 2019-11-01 14:04:22
 * @Author: mason
 */
import React, { Component } from 'react';
import { connect } from 'react-redux'
import './index.less'
import { Tag, Spin, Icon } from 'antd'
import { Link } from 'dva/router';
import { dateChange, request, translateMarkdown, judgeWidth } from '@/utils'
import { requestURL } from '@/config'


const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Home extends Component {

    state = {
        tags: [],
        spinFlag: true
    }
    componentDidMount () {
        this.props.getBlogs({ url: requestURL.blog })
        request({ url: requestURL.tags }).then(res => {
            let tags = res.data.map(item => ({ tag: item.tag, number: item.number }))
            this.setState({
                tags,
                spinFlag: false
            })
        })
    }

    render () {
        const { blogs } = this.props.app
        const { tags, spinFlag } = this.state
        return (
            <div className="home-box">
                <div className="home-box-top"></div>

                {/* <Spin tip="我们正在努力加载哦" indicator={antIcon} spinning={spinFlag}> */}
                <div className="home-box-left">
                    {
                        blogs.length > 0 && blogs.filter(item => item.status === 0).map(v => {
                            return (
                                <Link key={v._id} to={{
                                    pathname: `/blog/${v._id}`,
                                }}>
                                    <section className="me-section">
                                        <h2 className="me-title">{v.title}</h2>
                                        <content className="me-detail" dangerouslySetInnerHTML={{ __html: translateMarkdown(v.content) }}>
                                            {/* {v.content} */}
                                        </content>
                                        {judgeWidth() && <p className="me-submitTime">posted by {v.author} on {dateChange(v.date)}</p>}
                                    </section>
                                </Link>
                            )
                        })
                    }
                </div>
                {judgeWidth() && <div className="home-box-right">
                    <h4 style={{ marginBottom: 16 }}>MY TAGS:</h4>
                    <div>
                        {
                            tags.map(v => {
                                //实现随机颜色
                                return (
                                    <Link
                                        key={v.tag}
                                        to={{
                                            pathname: `/tags/${v.tag}`,
                                            query: v.tag
                                        }}
                                    >
                                        <Tag
                                            className="home-box-right-tag"
                                            onClick={this.blogsForTags}
                                            color={'#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6)}
                                        >
                                            {v.tag}({v.number})
                                       </Tag>
                                    </Link>
                                )
                            })
                        }

                    </div>
                </div>}
                {/* </Spin> */}
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
