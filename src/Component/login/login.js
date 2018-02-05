import React from 'react'
import { Redirect } from 'react-router-dom'
import Logo from '../../Container/logo/logo'
import { connect } from 'react-redux'
import {login} from '../../redux/user.redux'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.register = this.register.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    register() {
        this.props.history.push('./register');
    }
    handleChange(key, value) {
        this.setState({
            [key]: value
        })
    }
    handleLogin() {
        this.props.login(this.state)
    }
    render() {
        return (
            <div>
                {(this.props.redirectTo&&this.props.redirectTo!=='/login') ? <Redirect to={this.props.redirectTo}/> : null}
                <Logo />
                <WingBlank>
                <div className='error-msg'>{this.props.msg?this.props.msg:""}</div>
                    <List>
                        <InputItem onChange={v => this.handleChange('user', v)}>用户</InputItem>
                        
                        <InputItem type="password" onChange={v => this.handleChange('pwd', v)}>密码</InputItem>
                    </List>
                    <WhiteSpace />
                    <WhiteSpace />
                    <WhiteSpace />
                    <Button type="primary" onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace />
                    <Button onClick={this.register} type="primary">注册</Button>
                </WingBlank>
            </div>
        )
    }
}

Login = connect(state => {
    return{
        msg:state.userRedurce.msg,
        redirectTo:state.userRedurce.redirectTo,
    } 
}, {
    login
    })(Login)

export default Login