import React from 'react'
import { connect } from 'react-redux'
import UserCard from '../usercard/usercard'
import {getUserList} from '../../redux/chatuser.redux'

@connect(
    state=>{
        return {
            userlist:state.chatuser.userlist,
        }
    },
    {
        getUserList
    }
)
class Boss extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            data:[]
        }
    }
    componentDidMount(){
       this.props.getUserList('genius')
    }
    render(){
        return(
            <UserCard userlist={this.props.userlist}/>
        )
    }
}

export default Boss