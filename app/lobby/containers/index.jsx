import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import Lobby from '../components'

import { newGame } from '../action-creators'

class LocalContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      user: '',
      players: [],
      status: false
    }

    this.statusChangeHandler = this.statusChangeHandler.bind(this)
    this.startGameHandler = this.startGameHandler.bind(this)
  }

  componentDidMount() {
    this.props.socket.on('player:lobby', this._enterLobby.bind(this))
    this.props.socket.on('player:join', this._addPlayer.bind(this))
    this.props.socket.on('player:leave', this._removePlayer.bind(this))
    this.props.socket.on('change:player', this._playerChangeName.bind(this))
    this.props.socket.on('game:start', this._startGame.bind(this))
  }

  _enterLobby(data) {
    const { user, players } = data

    this.setState({ user, players })
  }

  _addPlayer(data) {
    const { players } = this.state
    const { player } = data

    players.push(player)
    this.setState({ players })
  }

  _removePlayer(data) {
    const { players } = this.state
    const { player } = data
    const index = players.indexOf(player)

    players.splice(index, 1)
    this.setState({ players })
  }

  _playerChangeName(data) {
    const { newName } = data
    const { user, players, status } = this.state

    if (status) {
      const index = players.indexOf(user)
      players.splice(index, 1)
      this.props.socket.emit('player:leave')
    }

    this.setState({ user: newName, players, status: false })
  }

  _startGame(data) {
    const { startingPlayers, game, randomGameId } = data
    const { user } = this.state

    if (startingPlayers.includes(user)) {
      this.props.socket.emit('game:join')
      browserHistory.push(`/explodingpuppies?room=${randomGameId}`)
    }
  }

  statusChangeHandler(event) {
    event.preventDefault()
    const { user, players, status } = this.state

    if (!status) {
      players.push(user)
      this.props.socket.emit('player:join')
    } else {
      const index = players.indexOf(user)
      players.splice(index, 1)
      this.props.socket.emit('player:leave')
    }
    this.setState({ players, status: !status })
  }

  startGameHandler(event) {
    event.preventDefault()
    this.props.socket.emit('game:start')
  }

  render() {
    return (
      <Lobby
        status={this.state.status}
        players={this.state.players}
        statusChangeHandler={this.statusChangeHandler}
        startGameHandler={this.startGameHandler}
      />
    )
  }
}

const mapStateToProps = ({ socket }) => ({ socket })

const mapDispatchToProps = dispatch => ({
  newGame: game => dispatch(newGame(game))
})

const LobbyContainer = connect(mapStateToProps, mapDispatchToProps)(LocalContainer)

export default LobbyContainer
