const chatHandler = require('./chatHandler')
const lobbyHandler = require('./lobbyHandler')
const NameList = require('./NameList')
const PlayerList = require('./PlayerList')

const userNames = new NameList()
const playerNames = new PlayerList()

const socketEventHandler = function(io) {
  io.sockets.on('connection', function(socket) {
    socket.on('join:room', function(roomName) {
      socket.name = userNames.getGuestName(roomName)

      socket.join(roomName)

      chatHandler(io, socket, userNames, roomName)
      lobbyHandler(io, socket, playerNames, roomName)
    })
  })
}

module.exports = socketEventHandler
