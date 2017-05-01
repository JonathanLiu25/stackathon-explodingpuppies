import { START_GAME } from './constants'

const startGame = game => ({
  type: START_GAME,
  game
})

export const newGame = game =>
  dispatch =>
    dispatch(startGame(game))
