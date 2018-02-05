import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://47.104.18.114:9093');

const MSG_LIST = 'MSG_LIST'
const MSG_RECV = 'MSG_RECV'
const MSG_READ = 'MSG_READ'
const initState = {
    chatmsg:[],
    unread:0,
    users:{}
}

export function chat(state = initState,action){
    switch (action.type) {
        case MSG_LIST:
            return {
                        ...state,
                        chatmsg:action.payLoad.msgs,
                        unread:action.payLoad.msgs.filter(v=>!v.read&&v.to===action.payLoad.userid).length,
                        users:action.payLoad.users
                    }
        case MSG_READ:    
            const {from,num} = action.payLoad;
            return {...state,unread:state.unread-num,chatmsg:state.chatmsg.map(v=>{
                v.read = from === v.from?true:v.read;
                return v
            })}
        case MSG_RECV:
            const n = action.payLoad.msg.to === action.payLoad.userid?1:0;
            return {...state,chatmsg:[...state.chatmsg,action.payLoad.msg],unread:state.unread+n} 
        
        default:
            return state
    }
}

function msgList(msgs,users,userid){
    return {type:MSG_LIST,payLoad:{msgs,users,userid}}
}

export function getMsgList(msg){
    return (dispatch,getState) =>{
        axios.get('/user/getmsgList')
            .then((res)=>{
                if(res.status === 200 && res.data.code === 0){
                    let msgs = res.data.msgs || []
                    let users = res.data.users || {}
                    let userid = getState().userRedurce._id;
                    dispatch(msgList(msgs,users,userid))
                }
            })
    }
}

export function sendMsg(from,to,msg){
    return dispatch=>{
        socket.emit('sendmsg',{from,to,msg})
    }
}

function msgRecv(msg,userid){
    return {type:MSG_RECV,payLoad:{msg,userid}}
}

function msgRead({from,userid,num}){
    return {type:MSG_READ,payLoad:{from,userid,num}}
}

export function recvMsg(){
    return (dispatch,getState) => {
        socket.on('recvmsg',function(data){
            console.log('recvmsg',data)
            let userid = getState().userRedurce._id;
            dispatch(msgRecv(data,userid))
        })
    }
}

export function readMsg(from){
    return (dispatch,getState)=>{
        axios.post('/user/readmsg',{from})
            .then((res)=>{
                const userid = getState().userRedurce._id;
                const num = res.data.num;
                if(res.status === 200 && res.data.code === 0){
                    dispatch(msgRead({from,userid,num}))
                }
            })
    }
}