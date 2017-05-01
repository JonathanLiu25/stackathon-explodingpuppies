class PlayerList {
  constructor() {
    this.players = []
  }

  getPlayers() {
    return this.players.map(player => player)
  }

  addPlayer(playerSocket) {
    this.players.push(playerSocket)
  }

  removePlayer(playerSocket) {
    const index = this.players.indexOf(playerSocket)
    this.players.splice(index, 1)
  }

  getStartingPlayers() {
    return this.players.splice(0, 5)
  }
}

module.exports = PlayerList
