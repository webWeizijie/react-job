import axios from 'axios'
import { getRedirectPath } from '../utils/util'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const USER_DATA = 'USER_DATA'
const LOGOUT = 'LOGOUT'
const initState = {
    redirectTo:'',
    type: '',
    user:'',
    msg:''
}

export function userRedurce(state = initState,action){
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...state,msg:'',redirectTo:getRedirectPath(action.payload), ...action.payload}
        case USER_DATA:
            return {...state,...action.payload}
        case ERROR_MSG:
            return {...state,msg:action.msg}
        case LOGOUT:
            return {...initState,redirectTo:'/login'}
        default:
            return state
    }
}       
function errorMsg(msg){
    return {msg,type:ERROR_MSG}
}

export function checkRegister(state){
    let {pwd,repeatpwd,user,type} = state;
    if(!pwd || !repeatpwd || !user){
        return errorMsg('请填写全部信息')
    }
    if(pwd !== repeatpwd){
        return errorMsg('两次密码请一致')
    }
    return dispatch => {
        axios.post('/user/register',{user,pwd,type}).then((res)=>{

            if(res.status === 200 && res.data.code === 0){
                dispatch(authSuccess({user,pwd,type}))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

export function login({user,pwd}){
    if(!user || !pwd ){
        return errorMsg('请输入用户名和密码')
    }
    return dispatch => {
        axios.post('/user/login',{user,pwd}).then((res)=>{

            if(res.status === 200 && res.data.code === 0){
                dispatch(authSuccess(res.data.doc))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

export function loadData(userinfo){
    return { type:USER_DATA,payload:userinfo}
}

export function update(data){
    return dispatch => {
        axios.post('/user/update',data)
          .then(res=>{
              if(res.status === 200){
                  console.log(res)
                dispatch(authSuccess(res.data.data))
              }else{
                dispatch(errorMsg(res.data.msg))
              }
          })
    }
}

function authSuccess(obj){
    let {pwd,...data} = obj;
    return {type:AUTH_SUCCESS,payload:data}
}

export function logoutSubmit(){
    return {type:LOGOUT}
}