import React from 'react'
import { TabBar } from 'antd-mobile'
class NavLink extends React.Component {
    constructor(){
        super()
        this.state = {
            selectedTab: 'redTab',
            hidden: false,
            fullScreen: false
        };
    }
    render() {
        return (
            <div>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.state.hidden}
                >
                {this.props.NavList.map(v=>
                    <TabBar.Item
                        title={v.title}
                        icon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat'
                        }}
                        />
                        }
                        selectedIcon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat'
                        }}
                        />
                        }
                        selected={this.state.selectedTab === 'blueTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'blueTab',
                            });
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