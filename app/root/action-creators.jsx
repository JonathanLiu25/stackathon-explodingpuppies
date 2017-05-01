import { SET_SOCKET } from './constants'

/* ACTION-CREATORS */
const setSocket = socket => ({
  type: SET_SOCKET,
  socket
})

/* DISPATCHERS */
export const getSocket = socket =>
  dispatch =>
    dispatch(setSocket(socket))
