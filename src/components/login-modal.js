import React, { Component } from 'react';
import { Modal, Form, Input, Button } from 'antd'
import { login } from '@/utils'
import config from '@/config'
import { connect } from 'react-redux'

class LoginModal extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        e.persist()
        console.log(e)
        let formData = ''
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                formData = values
            }
        });
        if (e.target.innerText === 'Login') {
            login({ data: formData }, '/login').then(res => {
                !res.data.status && this.loginSuccess(res.data.data.email)
            })

        } else {
            console.log('register')
        }
    };

    loginSuccess (value) {
        this.props.onCancel()
        config.isLogin = 1
        config.email = value
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
            >
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item key="email" >
                        {getFieldDecorator('email', {})(
                            <Input placeholder="请输入您的邮箱~" />
                        )}
                    </Form.Item>
                    <Form.Item key="password" >
                        {getFieldDecorator('password', {})(
                            <Input placeholder="请输入您的密码~" />
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