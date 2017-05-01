import React from 'react'

const Message = props => {
  const user = props.user
  const message = props.text

  return (
    <div className="chat-message">
      <strong>{user} : </strong>
      <span>{message}</span>
    </div>
  )
}

export default Message
