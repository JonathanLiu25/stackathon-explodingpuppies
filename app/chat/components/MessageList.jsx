import React from 'react'

import Message from './Message'

const MessageList = props => {
  const messages = props.messages

  return (
    <div className='chat-messages'>
      {messages.map((message, i) => (
        <Message
          key={i}
          user={message.user}
          text={message.text}
        />
      ))}
    </div>
  )
}

export default MessageList
