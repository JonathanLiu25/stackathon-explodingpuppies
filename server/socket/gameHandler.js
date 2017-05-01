const gameHandler = function(io, socket, game) {
  const userIndex = game.players.indexOf(socket.name)
  const playerHands = function() {
    return game.playerHands.map((hand, index) => hand.map(card => {
      if (index === userIndex) return card
      if (card === 'You exploded') return 'Player Exploded'
      return '???'
    }))
  }
  const currentPlayer = function() {
    return game.currentPlayer
  }

  socket.emit('game:init', {
    player: userIndex,
    players: game.players,
    playerHands: playerHands()
  })

  socket.on('game:state', function() {
    socket.emit('game:state', {
      playerHands: playerHands(),
      currentPlayer: currentPlayer()
    })
  })

  socket.on('game:draw', function() {
    if (userIndex === currentPlayer()) {
      socket.emit('game:draw', game.drawCard())
      io.sockets.emit('game:draw')
    }
  })

  socket.on('game:attack', function() {
    if (userIndex === currentPlayer()) {
      socket.emit('game:attack', game.attackNextPlayer())
      io.sockets.emit('game:attack')
    }
  })

  socket.on('game:skip', function() {
    if (userIndex === currentPlayer()) {
      socket.emit('game:skip', game.skipPlayer())
      io.sockets.emit('game:skip')
    }
  })

  socket.on('game:favor', function(targetPlayer) {
    if (userIndex === currentPlayer()) {
      socket.emit('game:favor', game.requestFavor(targetPlayer))
      io.sockets.emit('game:favor')
    }
  })

  socket.on('game:nope', function() {
    if (userIndex === currentPlayer()) {
      socket.emit('game:nope', game.nope())
      io.sockets.emit('game:nope')
    }
  })

  socket.on('game:future', function() {
    if (userIndex === currentPlayer()) {
      socket.emit('game:future', game.seeFuture())
      io.sockets.emit('game:future')
    }
  })

  socket.on('game:shuffle', function() {
    if (userIndex === currentPlayer()) {
      socket.emit('game:shuffle', game.shufflePile())
      io.sockets.emit('game:shuffle')
    }
  })

  socket.on('game:discardTwo', function(discardCards, targetPlayer, targetCardNumber) {
    if (userIndex === currentPlayer()) {
      socket.emit('game:discardTwo', game.discardTwo(discardCards, targetPlayer, targetCardNumber))
      io.sockets.emit('game:discardTwo')
    }
  })

  socket.on('game:discardThree', function(discardCards, targetPlayer, targetCard) {
    if (userIndex === currentPlayer()) {
      socket.emit('game:discardThree', game.discardThree(discardCards, targetPlayer, targetCard))
      io.sockets.emit('game:discardThree')
    }
  })

  socket.on('game:count', function() {
    socket.emit('game:count', game.countDrawPile())
  })

  socket.on('game:checkDiscard', function() {
    socket.emit('game:checkDiscard', game.showDiscardPile())
  })

  socket.on('game:test', function() {
    console.log('got here')
  })
}

module.exports = gameHandler
