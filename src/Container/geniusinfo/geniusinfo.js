import React from 'react'
import { Redirect } from 'react-router-dom'
import { NavBar, InputItem,TextareaItem,Button } from 'antd-mobile'
import { connect } from 'react-redux'
import AvatarSelector from '../../Component/AvatarSelector/AvatarSelector'
import {update} from '../../redux/user.redux'

@connect(
    state=>{
        return {
            user:state.userRedurce.user,
            redirectTo:state.userRedurce.redirectTo
        }
    },
    {
        update
    }
)
class GeniusInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title:'',
            desc:''
        }
    }
    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    
    render() {
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo;
        return (
            <div>
                {redirect && redirect !== path ? <Redirect to={this.props.redirectTo}></Redirect>:null}
                <NavBar mode="dark">BOSS完善信息页</NavBar>
                <AvatarSelector handleChange={(elm)=>{
                   this.setState({
                       avatar:elm.text
                   })
                }} />
                <InputItem onChange={(v) => { this.handleChange('title', v) }}>
                    求职岗位
                </InputItem>
                <TextareaItem rows={3} autoHeight title='个人简介' onChange={(v) => { this.handleChange('desc', v) }} />
                <Button 
                    type="primary"
                    onClick={()=>{
                        this.props.update(this.state)
                    }}
                >保存</Button>
            </div>
        )
    }
}

export default GeniusInfo
