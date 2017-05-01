import React from 'react'

const ExplodingPuppiesComponent = props => {
  const player = props.player
  const players = props.players
  const playerHands = props.playerHands
  const currentPlayer = props.currentPlayer
  const targetPlayer = props.targetPlayer
  const drawCard = props.drawCard
  const attackCard = props.attackCard
  const skipCard = props.skipCard
  const targetPlayerChangeHandler = props.targetPlayerChangeHandler
  const favorCard = props.favorCard
  const nopeCard = props.nopeCard
  const futureCard = props.futureCard
  const shuffleCard = props.shuffleCard
  const countDrawPile = props.countDrawPile
  const showDiscardPile = props.showDiscardPile
  const addAlert = props.addAlert
  const discardCards = props.discardCards
  const discardCardsChangeHandler = props.discardCardsChangeHandler
  const targetCardNumber = props.targetCardNumber
  const targetCardNumberChangeHandler = props.targetCardNumberChangeHandler
  const targetCardChangeHandler = props.targetCardChangeHandler
  const discardTwo = props.discardTwo
  const discardThree = props.discardThree
  const discardFive = props.discardFive

  return (
    <div className="puppies-container">
      <div className="card-container">
        <div className="player-hands">
          {playerHands.map((hand, handIdx) => {
            if (hand.includes('???') || hand.includes('Player Exploded')) {
              return (
                <div key={`hand${handIdx}`} className={`player-hand-container ${handIdx === currentPlayer && 'active-player'}`}>
                  <span
                    className={`player-name ${targetPlayer === `player-name${handIdx}` && 'active'} player-name${handIdx}`}
                    onClick={targetPlayerChangeHandler}>
                    <p className="no-select"><strong>{`Player ${handIdx + 1}`}</strong></p>
                  </span>
                  <div className={`player-hand`}>
                    {hand.map((card, cardIdx) => (
                      <span
                        key={`card${cardIdx}`}
                        className={`player-card opponent-card ${card} ${targetCardNumber === `${handIdx}player-card-0${cardIdx}` && 'active'} ${handIdx}player-card-0${cardIdx}`}
                        onClick={targetCardNumberChangeHandler}>
                        {card === 'Player Exploded'
                          ? <p className="no-select"><strong>X</strong></p>
                          : <p className="no-select"><strong>?</strong></p>}
                      </span>
                    ))}
                  </div>
                </div>
              )
            }
          })}
        </div>
        <div className="self-hand-container">
          {playerHands.map((hand, handIdx) => {
            if (!hand.includes('???') && !hand.includes('Player Exploded')) {
              return (
                <div key={`playerhand${handIdx}`} className={`self-hand ${handIdx === currentPlayer && 'active-player'}`}>
                  {hand.map((card, cardIdx) => (
                    <span
                      key={`playercard${cardIdx}`}
                      className={`player-card ${card} self-card ${discardCards.includes(`self-card-0${cardIdx}`) && 'active'} self-card-0${cardIdx}`}
                      onClick={discardCardsChangeHandler}>
                      <p className="no-select"><strong>{card}</strong></p>
                    </span>
                  ))}
                </div>
              )
            }
          })}
        </div>
      </div>
      <hr />
      <div className="player-turn-status">
        {player === currentPlayer
          ? <span><h3>Your turn</h3></span>
          : <span><h3>Player {currentPlayer + 1}'s turn</h3></span>
        }
      </div>
      <hr />
      <div className="button-actions">
        <button className="btn card-btn card-btn-green" onClick={drawCard}>Draw Card</button>
        <button className="btn card-btn card-btn-cyan700" onClick={countDrawPile}>Count Draw Pile</button>
        <button className="btn card-btn card-btn-indigo500" onClick={showDiscardPile}>Show Discard Pile</button>
        <button className="btn card-btn card-btn-orange" onClick={attackCard}>Attack</button>
        <button className="btn card-btn card-btn-blue" onClick={skipCard}>Skip</button>
        <button className="btn card-btn card-btn-pink" onClick={futureCard}>Future</button>
        <button className="btn card-btn card-btn-brown" onClick={shuffleCard}>Shuffle</button>
        <form>
          <label>
            <span>What card do you want? </span>
            <input type="text" placeholder="Target card" onChange={targetCardChangeHandler} />
          </label>
        </form>
        <button className="btn card-btn card-btn-black" onClick={favorCard}>Favor</button>
        <button className="btn card-btn card-btn-deepPurple300" onClick={discardTwo}>Discard 2</button>
        <button className="btn card-btn card-btn-deepPurple400" onClick={discardThree}>Discard 3</button>
        <button className="btn card-btn card-btn-deepPurple500" onClick={discardFive}>Discard 5</button>
        <button className="btn card-btn card-btn-red" onClick={nopeCard}>Nope</button>
      </div>
    </div >
  )
}

export default ExplodingPuppiesComponent
