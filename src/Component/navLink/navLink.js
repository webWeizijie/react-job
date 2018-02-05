import React from 'react'
import Proptypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'

@connect(
    state=>{
        return {
            chat:state.chat
        }
    },
    null
)
@withRouter
class NavLink extends React.Component {
    static Proptypes = {
        NavList:Proptypes.array.isRequired
    }
    constructor(){
        super()
        this.state = {
            selectedTab: 'redTab',
            hidden: false,
            fullScreen: false
        };
    }
    render() {
        const NavList = this.props.data.filter(v=>!v.hide);
        const {pathname} = this.props.location;
        return (
            <div className="fixed-bottom">
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.state.hidden}
                >
                {NavList.map(v=>
                    <TabBar.Item
                        badge={v.path==='/msg'?this.props.chat.unread:null}
                        title={v.title}
                        key={v.path}
                        icon={<img src={require(`./img/${v.icon}.png`)} alt='icon' width='20' height='20' />}
                        selectedIcon={<img src={require(`./img/${v.icon}-active.png`)} alt='icon' width='20' height='20' />}
                        selected={pathname === v.path}
                        onPress={() => {
                            this.props.history.push(v.path)
                        }}
                    >
                        
                    </TabBar.Item>
                    )}
                </TabBar>
               
            </div>
        )
    }
}

export default NavLink