import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import { connect } from 'react-redux'
import { Button, Input, message } from 'antd'
import { request } from '@/utils'
import { requestURL } from '@/config'
import Editor from '@/components/editor'
class BlogWrite extends Component {

    state = {
        content2node: '',
        content2show: '',
        title: '',
        tags: '',
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],
                ['link', 'image'],

                [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction

                // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'font': [] }],
                [{ 'align': [] }],

                ['clean']                                         // remove formatting button
            ]
        }
    }


    mdSwitch (value) {

        this.setState({
            content: value
        })
    }

    handleEditorChange ({ html, text }) {
        console.log('handleEditorChange', html, text)
        this.setState({
            content2node: text,
            content2show: text
        })
    }

    handelChange (v, e) {
        e.persist()
        this.setState({
            [v]: e.target.value
        })
    }
    submitClick (status) {
        const { email } = this.props.app.user
        if (!email) {
            return message.error('登录后才能发布博客哟~')
        }
        request({
            data: {
                title: this.state.title,
                author: email,
                tags: this.state.tags,
                content: this.state.content2node,
                status
            },
            method: 'post',
            url: requestURL.blog
        })
    }

    componentDidMount () {
        if (!!(this.props.location.state)) {
            let { record, content } = this.props.location.state

            this.setState({
                title: record.title,
                tags: record.tags.join('，'),
                content
            })
        }
    }

    render () {


        return (
            <div className="write-box">
                <div className="write-box-input">
                    <span>Title: <Input value={this.state.title} onChange={this.handelChange.bind(this, 'title')} placeholder="title" /></span>
                    {/* <span>Author: <Input onChange={this.handelChange.bind(this, 'author')} placeholder="author" /></span> */}
                    <span>Tags: <Input value={this.state.tags} onChange={this.handelChange.bind(this, 'tags')} placeholder="多个tag用，分隔" /></span>
                </div>
                <div className="write-box-edit">
                    {/* <ReactQuill
                        value={this.state.content}
                        onChange={this.mdSwitch.bind(this)}
                        className="write-box-edit-quill"
                        modules={this.state.modules}
                    /> */}
                    <Editor
                        value={this.state.content2show}
                        onChange={this.handleEditorChange.bind(this)}
                        className="write-box-edit-quill"
                    />
                </div>
                <div className="write-box-btn">
                    <Button onClick={this.submitClick.bind(this, 0)} type="primary">提交</Button>
                    <Button onClick={this.submitClick.bind(this, 1)}>保存</Button>
                </div>

            </div>
        )
    }
}

export default connect(
    ({ app }) => ({ app })
)(BlogWrite)


