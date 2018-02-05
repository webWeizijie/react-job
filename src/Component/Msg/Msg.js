import React from 'react'
import { connect } from 'react-redux'
import {List,Badge} from 'antd-mobile'

@connect(
    state=>state,
    null
)
class Msg extends React.Component{
    getLast(arr){
        return arr[arr.length-1]
    }
    render(){
        // if(!this.props.chat.chatmsg.length){
        //     return 
        // }
        const Item = List.Item
        const Brief = Item.Brief
        const userid = this.props.userRedurce._id;
        const userinfo = this.props.chat.users;
        console.log(this.props)
        const msgGroup = {

        }
        this.props.chat.chatmsg.forEach(ele => {
            msgGroup[ele.chatid] = msgGroup[ele.chatid] || []
            msgGroup[ele.chatid].push(ele)
        });

        const chatList = Object.values(msgGroup).sort((a,b)=>{
            const a_last = this.getLast(a).create_time;
            const b_last = this.getLast(b).create_time;
            console.log(a_last,b_last)
            return b_last - a_last
        });
        return (
            <div>
                {chatList.map(v=>{
                    const targetId = v[0].from === userid?v[0].to:v[0].from;
                    const unreadNum = v.filter(ele=>{return !ele.read&&ele.to === userid}).length;
                    const name = userinfo[targetId]?userinfo[targetId].name:''
                    const avatar = userinfo[targetId]?userinfo[targetId].avatar:''
                    const lastItem = this.getLast(v)
                    return (
                    <List key={lastItem._id}>
                        <Item extra={<Badge text={unreadNum}></Badge>} arrow="horizontal" onClick={()=>{
                            this.props.history.push(`/chat/${targetId}`)
                        }}>
                            {name}
                        <Brief>{lastItem.content}</Brief>
                        </Item> 
                    </List>
                    )
                })} 
            </div>
        )
    }
}

export default Msg