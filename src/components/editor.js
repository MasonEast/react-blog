import React from 'react'
import MdEditor from 'react-markdown-editor-lite'
import MarkdownIt from 'markdown-it'

const MOCK_DATA = "Hello.\n\n * This is markdown.\n * It is fun\n * Love it or leave it."
export default class Demo extends React.Component {
    mdParser = null
    constructor(props) {
        super(props)
        this.mdParser = new MarkdownIt(/* Markdown-it options */)
    }
    handleEditorChange ({ html, text }) {
        console.log('handleEditorChange', html, text)
    }
    render () {
        const { onChange, value } = this.props
        return (
            <div style={{ height: 500 }}>
                <MdEditor
                    value={value}
                    renderHTML={(text) => this.mdParser.render(text)}
                    onChange={onChange}
                />
            </div>
        )
    }
}