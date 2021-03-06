import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import {Card,WhiteSpace,WingBlank} from 'antd-mobile'

@withRouter
class UserCard extends React.Component{
    static propTypes = {
        userlist:PropTypes.array.isRequired
    }
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(v){
      this.props.history.push(`/chat/${v._id}`)
    }
    render(){
        return (
            <WingBlank>
                <WhiteSpace></WhiteSpace>
                {this.props.userlist.map(v=>(
                    v.avatar?
                    (<Card key={v._id} onClick={()=>{this.handleChange(v)}}>
                        <Card.Header
                            title={v.user} 
                            thumb={require(`../img/${v.avatar}.png`)}
                            extra={<span>{v.title}</span>}
                        >

                        </Card.Header>
                        <Card.Body>
                            {v.type === 'boss'?<div>公司:{v.company}</div>:null}
                            {v.desc.split('\n').map(d=>(
                                <div key={d}>{d}</div>
                            ))}
                            {v.type === 'boss'?<div>薪资:{v.money}</div>:null}
                        </Card.Body>
                    </Card>):null
                    
                ))}
            </WingBlank>
        )
    }
}

export default UserCard