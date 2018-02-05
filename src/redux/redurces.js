import { combineReducers } from 'redux'
import { userRedurce } from './user.redux'
import {chatuser} from './chatuser.redux'
import {chat} from './chat.redux'

export default combineReducers({userRedurce,chatuser,chat})