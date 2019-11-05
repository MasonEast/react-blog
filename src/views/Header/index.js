import React, { Component } from 'react';
import { Switch, Link } from 'dva/router';
import RouteWithSubRoutes from '@/route/RouteWithSubRoutes'
import './index.less'
class Header extends Component {
    state = {
        isActive: 'Home'
    }
    changeActive = (e) => {
        e.persist()
        this.setState({
            isActive: e.target.innerHTML
        })
    }
    /**
     * 滚动函数，判断当前滚动条是否需要头部吸顶
     */
    scrollMethod = () => {
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
        return (
            <div className="header-box">
                <div className="header-box-tab">
                    <ul className="header-box-tab-ul" onClick={this.changeActive}>
                        <li><Link to="/home" className={(this.state.isActive === 'Home') ? 'active' : ''}>Home</Link></li>
                        <li><Link to="/admin/blogmanage" className={(this.state.isActive === 'Admin') ? 'active' : ''}>Admin</Link></li>
                        <li><Link to="/about" className={(this.state.isActive === 'About') ? 'active' : ''}>About</Link></li>
                    </ul>

                </div>
                <Switch>
                    {this.props.routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </Switch>
            </div>
        );
    }
}

export default Header;