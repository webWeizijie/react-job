import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadData } from '../../redux/user.redux'

@withRouter
class AuthRoute extends React.Component {
    componentWillMount() {
        const pathUrl = ['/login', '/register']
        const pathname = this.props.history.location.pathname;
        if (pathUrl.indexOf(pathname) > -1) {
            return null
        }
        axios.get('/user/info').then((res) => {
          
            if (res.status === 200) {
                if (res.data.code === 0) {
                    this.props.loadData(res.data.doc)
                } else {
                    this.props.history.push('/login')
                }
            }
        })
    }
    render() {
        return null
    }
}

AuthRoute = connect(
    null, {
        loadData
    }
)(AuthRoute)

export default AuthRoute