import React, { Component } from 'react';
import { Switch, Link } from 'dva/router';
import RouteWithSubRoutes from '@/route/RouteWithSubRoutes'
import './index.less'
import LoginModal from '@/components/login-modal'
import { connect } from 'react-redux'
class Header extends Component {
    state = {
        isActive: 'Home',
        visible: false
    }
    changeActive = (e) => {                    //一个简单判断是否给当前标签添加样式的逻辑
        e.persist()
        this.setState({
            isActive: e.target.innerHTML
        })
    }

    clickLogin = () => {
        this.setState({
            visible: true
        })
    }
    onCancel = () => {
        this.setState({
            visible: false
        })
    }
    scrollMethod = () => {                      //滚动函数，判断当前滚动条是否需要头部吸顶  
        let dom = document.querySelector('.header-box-tab-ul')
        // const sumH = document.body.scrollHeight || document.documentElement.scrollHeight
        // const viewH = document.documentElement.clientHeight
        const scrollH = document.body.scrollTop || document.documentElement.scrollTop
        if (scrollH >= 100 && !dom.classList.contains('fixTop')) {
            dom.classList.add('fixTop')
        }
        if (scrollH === 0 && dom.classList.contains('fixTop')) {
            dom.classList.remove('fixTop')
        }
    }
    componentDidMount () {
        this.props.history.push("/home");
        window.addEventListener('scroll', this.scrollMethod)
    }
    /**
     * 组件被销毁时，记得移除绑定的滚动事件
     */
    componentWillUnmount () {
        window.removeEventListener('scroll', this.scrollMethod)
    }

    render () {
        const { isLogin, email } = this.props.app.user
        return (
            <div className="header-box">
                <div className="header-box-tab">
                    <ul className="header-box-tab-ul" onClick={this.changeActive}>
                        <li><Link to="/home" className={(this.state.isActive === 'Home') ? 'active' : ''}>Home</Link></li>
                        <li><Link to="/admin/blogmanage" className={(this.state.isActive === 'Admin') ? 'active' : ''}>Admin</Link></li>
                        <li><Link to="/about" className={(this.state.isActive === 'About') ? 'active' : ''}>About</Link></li>
                        {
                            isLogin
                                ?
                                <li style={{ width: 250 }} className="header-box-tab-login" >欢迎, {email} <span onClick={this.props.userLogout}>退出</span></li>
                                :
                                <li className="header-box-tab-nologin" onClick={this.clickLogin}>登录/注册</li>
                        }
                    </ul>
                </div>
                <Switch>
                    {this.props.routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </Switch>
                <LoginModal
                    visible={this.state.visible}
                    onLogin={this.onLogin}
                    onRegister={this.onRegister}
                    onCancel={this.onCancel}
                />
            </div>
        );
    }
}

export default connect(
    ({ app }) => ({ app }),
    dispatch => ({
        userLogout: payload => dispatch({ type: 'app/USERLOGOUT', payload })       //退出登录，清除model里对应的user数据
    })
)(Header);