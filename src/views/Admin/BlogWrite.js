import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import { connect } from 'react-redux'
import { Button, Input, message } from 'antd'
import { submitData } from '@/utils'

class BlogWrite extends Component {

    state = {
        content: '',
        title: '',
        author: '',
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
        console.log(111, value)
        // var mdValue = document.getElementById("md-area").value || '';
        // var mdValue = value
        // var converter = new showdown.Converter();
        // var html = converter.makeHtml(mdValue);
        // document.getElementById("show-area").innerHTML = value;
        this.setState({
            content: value
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
        submitData({
            data: {
                title: this.state.title,
                author: email,
                tags: this.state.tags,
                content: this.state.content,
                status
            }
        }, '/blog')
    }

    render () {
        return (
            <div className="write-box">
                <div className="write-box-input">
                    <span>Title: <Input onChange={this.handelChange.bind(this, 'title')} placeholder="title" /></span>
                    {/* <span>Author: <Input onChange={this.handelChange.bind(this, 'author')} placeholder="author" /></span> */}
                    <span>Tags: <Input onChange={this.handelChange.bind(this, 'tags')} placeholder="tags" /></span>
                </div>
                <div className="write-box-edit">
                    <ReactQuill
                        value={this.state.content}
                        onChange={this.mdSwitch.bind(this)}
                        className="write-box-edit-quill"
                        modules={this.state.modules}
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


