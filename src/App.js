import React from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import Login from './Component/login/login'
import register from './Component/register/register'
import AuthRoute from './Component/AuthRoute/AuthRoute'
import BossInfo from './Container/BossInfo/BossInfo'
import geniusInfo from './Container/geniusinfo/geniusinfo'
import dashBoard from './Component/dashboard/dashboard'
import Chat from './Component/chat/chat'
export default class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            hasError:false
        }
    }
    componentDidCatch(err,info){
        console.log(err,info)
        this.setState({
            hasError:true
        })
    }
    render(){
        return this.state.hasError?<Redirect to={'/msg'}></Redirect> :(
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/register" component={register}></Route>
                    <Route path="/bossInfo" component={BossInfo}></Route>
                    <Route path="/geniusInfo" component={geniusInfo}></Route>
                    <Route path="/chat/:user" component={Chat}></Route>
                    <Route component={dashBoard}></Route>
                </Switch>
            </div>
        )
    }
}