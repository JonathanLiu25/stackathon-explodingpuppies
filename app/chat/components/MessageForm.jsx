import React from 'react'

const MessageForm = props => {
  const messageChangeHandler = props.messageChangeHandler
  const keyPressHandler = props.keyPressHandler
  const text = props.text

  return (
    <div className='chat-message-form'>
      <form>
        <textarea
          cols="30"
          rows="3"
          value={text}
          placeholder="Type your message here"
          onChange={messageChangeHandler}
          onKeyPress={keyPressHandler}
        />
      </form>
    </div>
  )
}

export default MessageForm
