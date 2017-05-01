const chatEventHandler = function(io, socket, userNames, room) {
  // send the new user their name and a list of users
  socket.emit('init', {
    name: socket.name,
    users: userNames.get(room)
  })

  // notify other clients that a new user has joined
  socket.broadcast.to(room).emit('user:join', {
    name: socket.name
  })

  // broadcast a user's message to other users
  socket.on('send:message', function(data) {
    socket.broadcast.to(room).emit('send:message', {
      user: socket.name,
      text: data.text
    })
  })

  // validate a user's name change, and broadcast it on success
  socket.on('change:name', function(newName, fn) {
    if (userNames.claim(newName, room)) {
      const oldName = socket.name
      userNames.free(oldName)

      socket.name = newName

      socket.broadcast.to(room).emit('change:name', {
        oldName,
        newName
      })

      socket.emit('change:player', {
        newName
      })

      fn(true)
    } else {
      fn(false)
    }
  })

  // clean up when a user leaves, and broadcast it to other users
  socket.on('disconnect', function() {
    userNames.free(socket.name)

    socket.broadcast.to(room).emit('user:left', {
      name: socket.name
    })
  })
}

module.exports = chatEventHandler
