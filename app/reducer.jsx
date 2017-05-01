import { combineReducers } from 'redux'
import auth from './reducers/auth'
import socket from './root/reducer'
import chat from './chat/reducer'
import game from './lobby/reducer'

const rootReducer = combineReducers({
  auth,
  socket,
  chat,
  game
})

export default rootReducer
