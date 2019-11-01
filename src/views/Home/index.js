import React, { Component } from 'react';
import { connect } from 'react-redux'
import './index.less'
import { Card, Tag } from 'antd'
class Home extends Component {
    render () {
        return (
            <div className="home-box">
                <div className="home-box-left">
                    <Card title="Default size card" bordered={false} >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <Card title="Default size card" bordered={false} >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <Card title="Default size card" bordered={false} >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <Card title="Default size card" bordered={false} >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <Card title="Default size card" bordered={false} >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <Card title="Default size card" bordered={false} >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <Card title="Default size card" bordered={false} >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <Card title="Default size card" bordered={false} >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </div>
                <div className="home-box-right">
                    <h4 style={{ marginBottom: 16 }}>Presets:</h4>
                    <div>
                        <Tag color="magenta">magenta</Tag>
                        <Tag color="red">red</Tag>
                        <Tag color="volcano">volcano</Tag>
                        <Tag color="orange">orange</Tag>
                        <Tag color="gold">gold</Tag>
                        <Tag color="lime">lime</Tag>
                        <Tag color="green">green</Tag>
                        <Tag color="cyan">cyan</Tag>
                        <Tag color="blue">blue</Tag>
                        <Tag color="geekblue">geekblue</Tag>
                        <Tag color="purple">purple</Tag>
                    </div>
                    <h4 style={{ margin: '16px 0' }}>Custom:</h4>
                    <div>
                        <Tag color="#f50">#f50</Tag>
                        <Tag color="#2db7f5">#2db7f5</Tag>
                        <Tag color="#87d068">#87d068</Tag>
                        <Tag color="#108ee9">#108ee9</Tag>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    ({ home, app }) => ({ home, app })
)(Home);
