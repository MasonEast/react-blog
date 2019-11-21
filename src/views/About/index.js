import React, { Component } from 'react';
import { Divider, Icon } from 'antd';

class About extends Component {
    render () {
        return (
            <div style={{ width: '10rem', margin: '0 auto', marginTop: '1rem', fontSize: '18px', lineHeight: '40px' }}>
                <h2>
                    现在开始是晚了点，但是总比明天早点。
                </h2>
                <Divider orientation="left">关于项目</Divider>
                <p>
                    技术栈： React + antd + Node + mongodb + dva。
                </p>
                <p>
                    本项目开源在github上： <a target="_blank" href="https://github.com/MasonEast/react-blog">项目地址</a>
                </p>
                <p>
                    项目持续迭代中， 接下来主要是开发Library， 做一些有意思的东西。 项目主要用来学习交流， 不做商业用途！
                </p>
                <Divider orientation="left">关于我</Divider>
                <p>
                    毕业院校： 安徽财经大学     计算机科学与技术
                </p>
                <p>
                    现居住地： 上海
                </p>
                <p>
                    联系方式： email： sh941118@163.com        <span style={{ marginLeft: '50px' }}>github: <a target="_blank" href="https://github.com/MasonEast"><Icon type="github" />欢迎star~</a></span>
                </p>
                <Divider orientation="left">后话</Divider>
                <p>
                    项目开源， 欢迎感兴趣的道友加入进来一起玩耍~
                </p>
            </div>
        );
    }
}

export default About;