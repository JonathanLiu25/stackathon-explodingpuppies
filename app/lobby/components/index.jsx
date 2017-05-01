import React from 'react'
import { Link } from 'react-router'

const Lobby = props => {
  const players = props.players
  const status = props.status
  const statusChangeHandler = props.statusChangeHandler
  const startGameHandler = props.startGameHandler

  return (
    <div className="container">
      <div>
        <div>
          <h1>Are you ready?</h1>
        </div>

        <button
          className="btn ready-btn"
          onClick={statusChangeHandler}>
          {status
            ? <span><strong>Not Ready</strong></span>
            : <span><strong>Ready</strong></span>}
        </button>

        {status && players.length >= 2 && <button className="btn start-btn" onClick={startGameHandler}><strong>Start Game</strong></button>}

        <div>
          <h3>There are currently {players.length} player(s) ready </h3>
          <h3>Players: </h3>
          <div>
            {players.map((player, idx) => <h4 key={idx}>{player}</h4>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lobby
