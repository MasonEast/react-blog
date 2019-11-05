import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button, Input } from 'antd'
import { submitData } from '@/utils'
class BlogWrite extends Component {

    state = {
        content: '',
        title: '',
        author: '',
        tags: ''
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
    submitClick = () => {
        submitData({
            data: {
                title: this.state.title,
                author: this.state.author,
                tags: this.state.tags,
                content: this.state.content
            }
        }, '/blog')
    }

    render () {
        return (
            <div className="write-box">
                <div className="write-box-input">
                    <span>Title: <Input onChange={this.handelChange.bind(this, 'title')} placeholder="title" /></span>
                    <span>Author: <Input onChange={this.handelChange.bind(this, 'author')} placeholder="author" /></span>
                    <span>Tags: <Input onChange={this.handelChange.bind(this, 'tags')} placeholder="tags" /></span>
                </div>
                <div className="write-box-edit">
                    <ReactQuill
                        value={this.state.content}
                        onChange={this.mdSwitch.bind(this)}
                        className="write-box-edit-quill"
                    />
                </div>
                <div className="write-box-btn">
                    <Button onClick={this.submitClick} type="primary">提交</Button>
                    <Button>保存</Button>
                </div>
            </div>
        )
    }
}

export default BlogWrite


