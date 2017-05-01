import { START_GAME } from './constants'

const lobbyReducer = (state = null, action) => {
  switch (action.type) {
  case START_GAME:
    return action.game
  default:
    return state
  }
}

export default lobbyReducer
