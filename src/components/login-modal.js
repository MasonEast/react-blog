import React, { Component } from 'react';
import { Modal, Form, Input, Button } from 'antd'
import { request } from '@/utils'
import { requestURL } from '@/config'
import { connect } from 'react-redux'
import './index.less'
class LoginModal extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        e.persist()
        let formData = ''
        this.props.form.validateFields((err, values) => {
            if (!err) {
                formData = values
            }
        });
        if (e.target.innerText === 'Login') {
            request({ data: formData, url: requestURL.login, method: 'post' }).then(res => {
                !res.status && this.loginSuccess(res.data.email)
            })

        } else {
            request({ data: formData, url: requestURL.register, method: 'post' }).then(res => {
                !res.status && this.loginSuccess(res.data.email)
            })
        }
    };

    loginSuccess (value) {
        this.props.onCancel()
        this.props.userLogin({
            isLogin: 1,
            email: value
        })
    }

    render () {
        const { visible, onCancel } = this.props
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title='登录/注册'
                visible={visible}
                onCancel={onCancel}
                footer={[]}
                className="login-modal"
            >
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item >
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ],
                        })(<Input placeholder="请输入您的邮箱~" />)}
                    </Form.Item>
                    <Form.Item key="password" >
                        {getFieldDecorator('password', {})(
                            <Input type="password" placeholder="请输入您的密码~" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={this.handleSubmit}>Login</Button>
                        <Button onClick={this.handleSubmit}>Register</Button>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

const Loginmodal = Form.create({ name: 'Loginmodal' })(LoginModal);

export default connect(
    ({ app }) => ({ app }),
    dispatch => ({
        userLogin: payload => dispatch({ type: 'app/USERLOGIN', payload }),
    })
)(Loginmodal)