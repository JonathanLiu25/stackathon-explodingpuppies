import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducer'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import socketio from 'socket.io-client'

import {whoami} from './reducers/auth'
import {getSocket} from './root/action-creators'

const socket = socketio.connect()

socket.emit('join:room', 'room123')

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      createLogger({collapsed: true}),
      thunkMiddleware
    )
  )
)

export default store

// Set the auth info at start
store.dispatch(whoami())

store.dispatch(getSocket(socket))
