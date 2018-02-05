import React from 'react'
import {NavBar} from 'antd-mobile'
import { connect } from 'react-redux'
import NavLink from '../navLink/navLink'
import { Route } from 'react-router-dom'
import Boss from '../boss/boss'
import User from '../../Container/user/user'
import Msg from '../Msg/Msg'
import Genius from '../genius/genius'
import {getMsgList,recvMsg} from '../../redux/chat.redux'
import {Redirect} from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'


@connect(
    state=>{
        return {
            type:state.userRedurce.type,
            chat:state.chat
        }
    },
    {
        getMsgList,
        recvMsg
    }
)
class dashBoard extends React.Component{
    constructor(){
        super()
        this.state = {
            
        }
    }
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList()
            this.props.recvMsg()
        }
        
    }
    render(){
        const path = this.props.location.pathname;
        const NavList = [{
            path:'/boss',
            text:'牛人',
            icon:'boss',
            title:'牛人列表',
            component:Boss,
            hide:this.props.type === 'genius'
        },
        {
            path:'/genius',
            text:'Boss',
            icon:'job',
            title:'BOSS列表',
            component:Genius,
            hide:this.props.type === 'boss'
        },
        {
            path:'/msg',
            text:'消息',
            icon:'msg',
            title:'消息列表',
            component:Msg,
        },
        {
            path:'/me',
            text:'我',
            icon:'user',
            title:'个人中心',
            component:User,
        }]
        const page = NavList.find(v=>v.path==path)
        
        return !page?<Redirect to={'/msg'}></Redirect> :(
            <div>
                <NavBar mode="dark" className="fixed-top">{page.title}</NavBar>
                <div className="fixed-content">
                    <QueueAnim delay={80} type={'scaleX'}>
                        <Route key={page.path} path={page.path} component={page.component}></Route>
                    </QueueAnim>
                </div>
                <NavLink data={NavList}></NavLink>
            </div>
        ) 
    }
}

export default dashBoard