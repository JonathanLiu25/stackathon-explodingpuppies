import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { ToastContainer, ToastMessage } from 'react-toastr'

import ExplodingPuppies from '../components'

const ToastMessageFactory = React.createFactory(ToastMessage.animation)

class LocalContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      player: 0,
      players: [],
      playerHands: [],
      currentPlayer: 0,
      targetPlayer: '',
      discardCards: [],
      targetCardNumber: '',
      targetCard: ''
    }

    this.drawCard = this.drawCard.bind(this)
    this.attackCard = this.attackCard.bind(this)
    this.skipCard = this.skipCard.bind(this)
    this.targetPlayerChangeHandler = this.targetPlayerChangeHandler.bind(this)
    this.favorCard = this.favorCard.bind(this)
    this.nopeCard = this.nopeCard.bind(this)
    this.futureCard = this.futureCard.bind(this)
    this.shuffleCard = this.shuffleCard.bind(this)
    this.countDrawPile = this.countDrawPile.bind(this)
    this.showDiscardPile = this.showDiscardPile.bind(this)
    this.discardCardsChangeHandler = this.discardCardsChangeHandler.bind(this)
    this.targetCardNumberChangeHandler = this.targetCardNumberChangeHandler.bind(this)
    this.targetCardChangeHandler = this.targetCardChangeHandler.bind(this)
    this.discardTwo = this.discardTwo.bind(this)
    this.discardThree = this.discardThree.bind(this)
    this.discardFive = this.discardFive.bind(this)
  }

  componentDidMount() {
    this.props.socket.on('game:init', this._getGameState.bind(this))
    this.props.socket.on('game:state', this._getGameState.bind(this))
    this.props.socket.on('game:draw', this._drawCard.bind(this))
    this.props.socket.on('game:attack', this._attackCard.bind(this))
    this.props.socket.on('game:skip', this._skipCard.bind(this))
    this.props.socket.on('game:favor', this._favorCard.bind(this))
    this.props.socket.on('game:nope', this._nopeCard.bind(this))
    this.props.socket.on('game:future', this._futureCard.bind(this))
    this.props.socket.on('game:shuffle', this._shuffleCard.bind(this))
    this.props.socket.on('game:count', this._countDrawPile.bind(this))
    this.props.socket.on('game:checkDiscard', this._showDiscardPile.bind(this))
    this.props.socket.on('game:discardTwo', this._discardTwo.bind(this))
    this.props.socket.on('game:discardThree', this._discardThree.bind(this))
    this.props.socket.on('game:discardFive', this._discardFive.bind(this))
  }

  _getGameState(data) {
    this.setState(data)
  }

  _drawCard(message) {
    this.checkMessage(message, 'Draw')
    this.props.socket.emit('game:state')
  }

  _attackCard(message) {
    this.checkMessage(message, 'Attack')
    this.props.socket.emit('game:state')
  }

  _skipCard(message) {
    this.checkMessage(message, 'Skip')
    this.props.socket.emit('game:state')
  }

  _favorCard(message) {
    this.checkMessage(message, 'Favor')
    this.props.socket.emit('game:state')
  }

  _nopeCard(message) {
    this.props.socket.emit('game:state')
  }

  _futureCard(message) {
    this.checkMessage(message, 'Future')
    this.props.socket.emit('game:state')
  }

  _shuffleCard(message) {
    this.checkMessage(message, 'Shuffle')
    this.props.socket.emit('game:state')
  }

  _countDrawPile(message) {
    this.toastPopUp(message, 'Draw Pile count')
  }

  _showDiscardPile(message) {
    this.toastPopUp(message || 'There is nothing in the discard pile', 'Discard Pile')
  }

  _discardTwo(message) {
    this.checkMessage(message, 'Two of a kind')
    this.props.socket.emit('game:state')
  }

  _discardThree(message) {
    this.checkMessage(message, 'Three of a kind')
    this.props.socket.emit('game:state')
  }

  _discardFive(message) {
    this.checkMessage(message, 'Five different cards')
    this.props.socket.emit('game:state')
  }

  drawCard() {
    this.props.socket.emit('game:draw')
  }

  attackCard() {
    this.props.socket.emit('game:attack')
  }

  skipCard() {
    this.props.socket.emit('game:skip')
  }

  targetPlayerChangeHandler(event) {
    let { targetPlayer, targetCardNumber } = this.state
    const classes = event.target.className.split(' ')
    const player = classes[classes.length - 1]

    targetPlayer = targetPlayer === player ? '' : player
    targetCardNumber = ''

    this.setState({ targetPlayer, targetCardNumber })
  }

  favorCard() {
    let { targetPlayer } = this.state
    if (targetPlayer) {
      targetPlayer = targetPlayer.charAt(targetPlayer.length - 1)
      this.props.socket.emit('game:favor', targetPlayer)
    }
  }

  nopeCard() {

  }

  futureCard() {
    this.props.socket.emit('game:future')
  }

  shuffleCard() {
    this.props.socket.emit('game:shuffle')
  }

  countDrawPile() {
    this.props.socket.emit('game:count')
  }

  showDiscardPile() {
    this.props.socket.emit('game:checkDiscard')
  }

  discardCardsChangeHandler(event) {
    const { discardCards } = this.state
    const classes = event.target.className.split(' ')
    const card = classes[classes.length - 1]
    const index = discardCards.indexOf(card)

    index === -1 ? discardCards.push(card) : discardCards.splice(index, 1)

    this.setState({ discardCards })
  }

  targetCardNumberChangeHandler(event) {
    let { targetCardNumber, targetPlayer } = this.state
    const classes = event.target.className.split(' ')
    const card = classes[classes.length - 1]
    const player = card[0]

    targetCardNumber = targetCardNumber === card ? '' : card
    targetPlayer = `player-name${player}`

    this.setState({ targetCardNumber, targetPlayer })
  }

  targetCardChangeHandler(event) {
    this.setState({ targetCard: event.target.value })
  }

  discardTwo() {
    let { targetPlayer, targetCardNumber, discardCards } = this.state
    if (targetPlayer && targetCardNumber && discardCards.length) {
      targetPlayer = targetPlayer.charAt(targetPlayer.length - 1)
      targetCardNumber = parseInt(targetCardNumber.slice(targetCardNumber.length - 2), 10)
      discardCards = discardCards.map(card => parseInt(card.slice(card.length - 2), 10))
      this.props.socket.emit('game:discardTwo', discardCards, targetPlayer, targetCardNumber)
    }
  }

  discardThree() {
    const { targetCard } = this.state
    let { targetPlayer, discardCards } = this.state
    if (targetPlayer && targetCard && discardCards.length) {
      targetPlayer = targetPlayer.charAt(targetPlayer.length - 1)
      discardCards = discardCards.map(card => parseInt(card.slice(card.length - 2), 10))
      this.props.socket.emit('game:discardThree', discardCards, targetPlayer, targetCard)
    }
  }

  discardFive() {

  }

  checkMessage(message, title) {
    if (message) {
      this.toastPopUp(message, title)
      this.setState({
        targetPlayer: '',
        discardCards: [],
        targetCardNumber: '',
        targetCard: ''
      })
    }
  }

  toastPopUp(message, title) {
    this.refs.container.success(
      message,
      title, {
        timeOut: 10000,
        closeButton: true
      }
    )
  }

  render() {
    return (
      <div className="container">
        <ExplodingPuppies
          {...this.state}
          drawCard={this.drawCard}
          attackCard={this.attackCard}
          skipCard={this.skipCard}
          targetPlayerChangeHandler={this.targetPlayerChangeHandler}
          favorCard={this.favorCard}
          nopeCard={this.nopeCard}
          futureCard={this.futureCard}
          shuffleCard={this.shuffleCard}
          countDrawPile={this.countDrawPile}
          showDiscardPile={this.showDiscardPile}
          discardCardsChangeHandler={this.discardCardsChangeHandler}
          targetCardChangeHandler={this.targetCardChangeHandler}
          targetCardNumberChangeHandler={this.targetCardNumberChangeHandler}
          discardTwo={this.discardTwo}
          discardThree={this.discardThree}
          discardFive={this.discardFive} />

        <ToastContainer
          ref="container"
          toastMessageFactory={ToastMessageFactory}
          className="toast-top-right" />
      </div>
    )
  }
}

const mapStateToProps = ({ socket, game }) => ({ socket, game })

const mapDispatchToProps = dispatch => ({

})

const ExplodingPuppiesContainer = connect(mapStateToProps, mapDispatchToProps)(LocalContainer)

export default ExplodingPuppiesContainer
