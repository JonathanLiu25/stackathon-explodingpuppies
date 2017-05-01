const gameHandler = require('./gameHandler')
const ExplodingPuppiesGame = require('./game')

let game

const lobbyEventHandler = function(io, socket, playerNames, room) {
  // send the existing players
  socket.emit('player:lobby', {
    user: socket.name,
    players: playerNames.getPlayers()
  })

  // updates the player list when a new player has joined
  socket.on('player:join', function() {
    playerNames.addPlayer(socket.name)

    socket.broadcast.emit('player:join', {
      player: socket.name
    })
  })

  // updates the player list when a player has left
  socket.on('player:leave', function() {
    playerNames.removePlayer(socket.name)

    socket.broadcast.emit('player:leave', {
      player: socket.name
    })
  })

  // removes a user from player list, and broadcast it to other users
  socket.on('disconnect', function() {
    const index = playerNames.getPlayers().indexOf(socket.name)

    if (index !== -1) {
      playerNames.removePlayer(socket.name)

      socket.broadcast.emit('player:leave', {
        player: socket.name
      })
    }
  })

  socket.on('game:start', function() {
    const startingPlayers = playerNames.getStartingPlayers()
    game = new ExplodingPuppiesGame(startingPlayers)
    game.setup()
    const randomGameId = Math.floor(Math.random() * 1000000)

    startingPlayers.forEach(player => {
      socket.broadcast.emit('player:leave', {
        player
      })
    })

    io.sockets.emit('game:start', {
      startingPlayers,
      game,
      randomGameId
    })
  })

  socket.on('game:join', function() {
    gameHandler(io, socket, game)
  })
}

module.exports = lobbyEventHandler
