const Cards = require('./cards.json')

const DIFFUSE = 'DIFFUSE',
  EXPLODE = 'EXPLODE',
  ATTACK = 'ATTACK',
  SKIP = 'SKIP',
  FAVOR = 'FAVOR',
  SHUFFLE = 'SHUFFLE',
  NOPE = 'NOPE',
  FUTURE = 'FUTURE',
  GAMEOVER = 'You exploded'

class ExplodingPuppies {
  constructor(players) {
    this.players = players
    this.playerCount = players.length
    this.drawPile = []
    this.discardPile = []
    this.playerHands = Array.apply(null, Array(this.playerCount)).map(() => [])
    this.currentPlayer = 0
    this.playerAttacked = false
  }

  setup() {
    this._insertCardsIntoDrawPile()
    this._shuffle()
    this._deal()
    this._insertDiffuseCardsIntoDrawPile()
    this._insertExplodeCardsIntoDrawPile()
    this._shuffle()
  }

  _showDrawPile() {
    return this.drawPile
  }

  _insertCardsIntoDrawPile() {
    Object.keys(Cards).forEach(card => {
      if (card === DIFFUSE || card === EXPLODE) return

      const quantity = Cards[card]

      for (let i = 0; i < quantity; i++) {
        this.drawPile.push(card)
      }
    })
  }

  _swap(idx1, idx2) {
    [this.drawPile[idx1], this.drawPile[idx2]] = [this.drawPile[idx2], this.drawPile[idx1]]
  }

  _deal() {
    for (let i = 0; i < this.playerHands.length; i++) {
      for (let j = 0; j < 4; j++) {
        this.playerHands[i].push(this.drawPile.pop())
      }
      this._dealDiffuseCards(i)
    }
  }

  _dealDiffuseCards(idx) {
    const handIndex = Math.floor(Math.random() * 5)

    this.playerHands[idx].splice(handIndex, 0, DIFFUSE)
  }

  _insertDiffuseCardsIntoDrawPile() {
    const count = 6 - this.playerCount

    for (let i = 0; i < count; i++) {
      this.drawPile.push(DIFFUSE)
    }
  }

  _insertExplodeCardsIntoDrawPile() {
    const count = this.playerCount - 1

    for (let i = 0; i < count; i++) {
      this.drawPile.push(EXPLODE)
    }
  }

  _currentPlayerHand() {
    return this.playerHands[this.currentPlayer]
  }

  _targetPlayerHand(target) {
    return this.playerHands[target]
  }

  _checkHand(card) {
    const cardIndex = this._currentPlayerHand().indexOf(card)

    if (cardIndex !== -1) {
      this._currentPlayerHand().splice(cardIndex, 1)
      this._sendToDiscardPile(card)

      return true
    }

    return false
  }

  _shuffle() {
    for (let i = this.drawPile.length; i > 0; i--) {
      const j = Math.floor(Math.random() * i)

      this._swap(i - 1, j)
    }
  }

  _sendToDiscardPile(card) {
    this.discardPile.push(card)
  }

  _checkCard(card) {
    if (card === EXPLODE) {
      if (this._checkHand(DIFFUSE)) {
        const randomIndex = Math.floor(Math.random() * this.drawPile.length)

        this.drawPile.splice(randomIndex, 0, EXPLODE)

        return 'You diffused an explosion'
      } else {
        this.discardPile.push(card, ...this._currentPlayerHand())
        this._killPlayer()

        return 'You exploded!!!'
      }
    } else {
      this._currentPlayerHand().push(card)

      return `You drew ${card}`
    }
  }

  _nextTurn() {
    this.currentPlayer = this.currentPlayer === this.playerCount - 1 ? 0 : this.currentPlayer + 1
    this._checkPlayerStatus()
  }

  _checkPlayerStatus() {
    if (this.playerHands[this.currentPlayer].includes(GAMEOVER)) this._nextTurn()
  }

  _killPlayer() {
    this._currentPlayerHand().splice(0, this._currentPlayerHand().length, GAMEOVER)
    this.playerAttacked = false
  }

  countDrawPile() {
    return this.drawPile.length
  }

  showDiscardPile() {
    return this.discardPile.join(', ')
  }

  drawCard() {
    const nextCard = this.drawPile.pop()

    const message = this._checkCard(nextCard)

    if (!this.playerAttacked) this._nextTurn()
    else this.playerAttacked = false

    return message
  }

  attackNextPlayer() {
    if (this._checkHand(ATTACK)) {
      this._nextTurn()
      this.playerAttacked = true

      return 'You attacked the next player'
    } else {
      return 'You do not have this card'
    }
  }

  skipPlayer() {
    if (this._checkHand(SKIP)) {
      this._nextTurn()

      return 'You skipped your turn'
    } else {
      return 'You do not have this card'
    }
  }

  requestFavor(targetPlayer) {
    const targetHand = this._targetPlayerHand(targetPlayer)

    if (!targetHand.includes(GAMEOVER) && this._checkHand(FAVOR)) {
      const randomTargetIndex = Math.floor(Math.random() * targetHand.length)
      const randomPlayerIndex = Math.floor(Math.random() * this._currentPlayerHand().length)
      const card = targetHand.splice(randomTargetIndex, 1)
      this._currentPlayerHand().splice(randomPlayerIndex, 0, ...card)

      return `You got ${card} from player ${parseInt(targetPlayer, 10) + 1}`
    }
  }

  nope() {

  }

  seeFuture() {
    if (this._checkHand(FUTURE)) {
      return [
        this.drawPile[this.drawPile.length - 1],
        this.drawPile[this.drawPile.length - 2],
        this.drawPile[this.drawPile.length - 3]
      ].join(', ')
    } else {
      return 'You do not have this card'
    }
  }

  shufflePile() {
    if (this._checkHand(SHUFFLE)) {
      this._shuffle()

      return 'The deck has been shuffled'
    } else {
      return 'You do not have this card'
    }
  }

  discardTwo(discardCards, targetPlayer, targetCardNumber) {
    const targetHand = this._targetPlayerHand(targetPlayer)

    if (!targetHand.includes(GAMEOVER) && discardCards.length === 2) {
      const cardOne = this._currentPlayerHand()[discardCards[0]]
      const cardTwo = this._currentPlayerHand()[discardCards[1]]
      if (cardOne === cardTwo) {
        discardCards.sort((a, b) => (a - b))
        this.discardPile.push(...this._currentPlayerHand().splice(discardCards[1], 1))
        this.discardPile.push(...this._currentPlayerHand().splice(discardCards[0], 1))
        const card = targetHand.splice(targetCardNumber, 1)
        const randomPlayerIndex = Math.floor(Math.random() * this._currentPlayerHand().length)
        this._currentPlayerHand().splice(randomPlayerIndex, 0, ...card)

        return `You got ${card} from player ${parseInt(targetPlayer, 10) + 1}`
      } else {
        return 'You did not pick 2 of the same cards'
      }
    } else {
      return 'You did not pick 2 of the same cards'
    }
  }

  discardThree(discardCards, targetPlayer, targetCard) {
    const targetHand = this._targetPlayerHand(targetPlayer)

    if (!targetHand.includes(GAMEOVER) && discardCards.length === 3) {
      const cardOne = this._currentPlayerHand()[discardCards[0]]
      const cardTwo = this._currentPlayerHand()[discardCards[1]]
      const cardThree = this._currentPlayerHand()[discardCards[2]]
      if (cardOne === cardTwo && cardTwo === cardThree) {
        discardCards.sort((a, b) => (a - b))
        this.discardPile.push(...this._currentPlayerHand().splice(discardCards[2], 1))
        this.discardPile.push(...this._currentPlayerHand().splice(discardCards[1], 1))
        this.discardPile.push(...this._currentPlayerHand().splice(discardCards[0], 1))
        const targetIndex = targetHand.indexOf(targetCard.toUpperCase())
        if (targetIndex !== -1) {
          const card = targetHand.splice(targetIndex, 1)
          const randomPlayerIndex = Math.floor(Math.random() * this._currentPlayerHand().length)
          this._currentPlayerHand().splice(randomPlayerIndex, 0, ...card)

          return `You got ${card} from player ${parseInt(targetPlayer, 10) + 1}`
        } else {
          return `Player ${targetPlayer + 1} did not have a ${targetCard}`
        }
      } else {
        return 'You did not pick 3 of the same cards'
      }
    } else {
      return 'You did not pick 3 of the same cards'
    }
  }

  discardFive(discardCards, targetCard) {
    if (discardCards.length === 5) {
      const cardOne = this._currentPlayerHand()[discardCards[0]]
      const cardTwo = this._currentPlayerHand()[discardCards[1]]
      const cardThree = this._currentPlayerHand()[discardCards[2]]
      const cardFour = this._currentPlayerHand()[discardCards[3]]
      const cardFive = this._currentPlayerHand()[discardCards[4]]
      const cards = [cardOne, cardTwo, cardThree, cardFour, cardFive]
      const checkCards = {}
      cards.forEach(card => {
        if (!checkCards[card]) checkCards[card] = true
      })
      if (Object.keys(checkCards).length === 5) {
        const targetIndex = this.discardPile.indexOf(targetCard.toUpperCase())
        if (targetIndex !== -1) {
          discardCards.sort((a, b) => (a - b))
          this.discardPile.push(...this._currentPlayerHand().splice(discardCards[4], 1))
          this.discardPile.push(...this._currentPlayerHand().splice(discardCards[3], 1))
          this.discardPile.push(...this._currentPlayerHand().splice(discardCards[2], 1))
          this.discardPile.push(...this._currentPlayerHand().splice(discardCards[1], 1))
          this.discardPile.push(...this._currentPlayerHand().splice(discardCards[0], 1))
          const card = this.discardPile.splice(targetIndex, 1)
          const randomPlayerIndex = Math.floor(Math.random() * this._currentPlayerHand().length)
          this._currentPlayerHand().splice(randomPlayerIndex, 0, ...card)

          return `You got ${card} from the discard pile`
        } else {
          return `There is no ${targetCard.toUpperCase()} in the discard pile`
        }
      } else {
        return 'You did not pick 5 different cards'
      }
    } else {
      return 'You did not pick 5 different cards'
    }
  }
}

module.exports = ExplodingPuppies
