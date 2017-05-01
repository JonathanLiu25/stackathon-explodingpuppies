import {
  CREATE_USER,
  CREATE_USERS,
  UPDATE_USER,
  UPDATE_USERS,
  DELETE_USER
} from './constants'

const initialState = {
  user: '',
  users: [],
  messages: []
}

const chatReducer = (state = initialState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
  case CREATE_USER:
    newState.user = action.user
    break

  case CREATE_USERS:
    newState.users = action.users
    break

  case UPDATE_USER:
    newState.user = action.user
    break

  case UPDATE_USERS:
    newState.user = action.users
    break

  default:
    return state
  }
  return newState
}

export default chatReducer
