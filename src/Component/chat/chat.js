import React from 'react'
import {List,InputItem,NavBar,Icon,Grid } from 'antd-mobile'
import {sendMsg,getMsgList,recvMsg,readMsg} from '../../redux/chat.redux'
import { connect} from 'react-redux'
import { getChatId } from '../../utils/util';
import { setTimeout } from 'timers';
import QueueAnim from 'rc-queue-anim'

@connect(
    state=>{
        return {
            state:state
        }
    },
    {
        sendMsg,
        getMsgList,
        recvMsg,
        readMsg
    }
)
class Chat extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            text:'',
            msg:[],
            showEmoji:false
        }
    }
    componentDidMount(){
        if(!this.props.state.chat.chatmsg.length){
            this.props.getMsgList()
            this.props.recvMsg()
        }
        
        
    }
    componentWillUnmount(){
        const to = this.props.match.params.user;
        this.props.readMsg(to)
    }
    handleSubmit(){
        const from = this.props.state.userRedurce._id;
        const to = this.props.match.params.user;
        const msg = this.state.text
        this.props.sendMsg(from,to,msg)
        this.setState({text:''})
    }
    fixCarousel(){
        setTimeout(()=>{
            window.dispatchEvent(new Event('resize'))
        },10)
    }
    render(){
        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
										.split(' ')
										.filter(v=>v)
                                        .map(v=>({text:v}))
                                        
        const userId = this.props.match.params.user;
        const users = this.props.state.chat.users;
        const Item = List.Item;
        if(!users[userId]){
            return null
        }
        const chatId = getChatId(userId,this.props.state.userRedurce._id)
        const chatmsgs = this.props.state.chat.chatmsg.filter(v=>v.chatid===chatId);

        return(
            <div id='chat-page'>
                <NavBar mode='dark' leftContent={<Icon type="left" />} onLeftClick={()=>{this.props.history.goBack()}} >
                    {users[userId].name}
                </NavBar>
                <div className="chat-content">
                    <QueueAnim delay={80} type="right">
                        {chatmsgs.map(v=>{
                            const avatar = require(`../img/${users[v.from].avatar}.png`)
                            return v.from === userId?(
                                <List key={v._id}>
                                    <Item thumb={avatar}>{v.content}</Item>
                                </List>
                            ):(
                                <List key={v._id}>
                                    <Item extra={<img src={avatar} alt='' />} className='chat-me'>{v.content}</Item>
                                </List>
                            )
                            
                            
                        })}
                    </QueueAnim>
                </div>
                <div className='stick-footer'>
                    <List>
                        <InputItem 
                            placeholder='请输入' 
                            value={this.state.text} 
                            onChange={v=>{
                            this.setState({text:v})
                            }}
                            extra={
                                <div className='center'>
                                    <span role="img" style={{marginRight:15,fontSize:12}} onClick={()=>{
                                        this.setState({showEmoji:!this.state.showEmoji})
                                        this.fixCarousel()
                                    }}>😃</span>
                                    <span onClick={()=> this.handleSubmit()}>发送</span>
                                </div>
                                
                            }
                            >
                            
                        </InputItem>
                    </List>
                    {this.state.showEmoji?(
                        <Grid data={emoji} columnNum={8} carouselMaxRow={4} isCarousel={true} hasLine={false} activeStyle={false}
                            onClick={el=>{
                                this.setState({
                                    text:this.state.text + el.text
                                })
                            }}
                        >

                        </Grid>
                    ):null}
                    
                </div>
            </div>
        )
    }
}

export default Chat