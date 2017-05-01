import React from 'react'

import MessageForm from '../components/MessageForm'

class MessageFormContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      text: ''
    }

    this.messageChangeHandler = this.messageChangeHandler.bind(this)
    this.keyPressHandler = this.keyPressHandler.bind(this)
  }

  messageChangeHandler(event) {
    this.setState({ text: event.target.value })
  }

  keyPressHandler(event) {
    if (event.key === 'Enter') {
      if (!event.shiftKey) {
        event.preventDefault()
        const message = {
          user: this.props.user,
          text: this.state.text
        }

        this.props.onMessageSubmit(message)
        this.setState({ text: '' })
      }
    }
  }

  render() {
    return (
      <MessageForm
        {...this.state}
        messageChangeHandler={this.messageChangeHandler}
        keyPressHandler={this.keyPressHandler} />
    )
  }
}

export default MessageFormContainer
