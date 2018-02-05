import React from 'react'
import Logo from '../../Container/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { checkRegister } from '../../redux/user.redux'

const RadioItem = Radio.RadioItem;

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type: 'genius',
            pwd: '',
            repeatpwd: '',
            user: ''
        }
        this.handleRegister = this.handleRegister.bind(this)
    }
    handleChange(key, value) {
        this.setState({
            [key]: value
        })
    }
    handleRegister() {
        this.props.checkRegister(this.state)
    }
    render() {
        return (
            <div>
                <Logo />
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <div className='error-msg'>{this.props.msg ? this.props.msg : ''}</div>
                <WingBlank>
                    <List>
                        <InputItem onChange={v => this.handleChange('user', v)}>用户</InputItem>
                        <InputItem type="password" onChange={v => this.handleChange('pwd', v)}>密码</InputItem>
                        <InputItem type="password" onChange={v => this.handleChange('repeatpwd', v)}>确认密码</InputItem>
                        <RadioItem onChange={() => this.handleChange('type', 'genius')} checked={this.state.type === 'genius'}>
                            牛人
                        </RadioItem>
                        <RadioItem onChange={() => this.handleChange('type', 'boss')} checked={this.state.type === 'boss'}>
                            BOSS
                        </RadioItem>
                    </List>
                    <WhiteSpace />
                    <WhiteSpace />
                    <Button onClick={this.handleRegister} type="primary">注册</Button>
                </WingBlank>
                
                

            </div>
        )
    }
}

Register = connect(
    state => {
        return {
            msg: state.userRedurce.msg,
            redirectTo: state.userRedurce.redirectTo
        }
    },
    {
        checkRegister
    }
)(Register)
export default Register