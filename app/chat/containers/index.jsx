import React from 'react'
import { connect } from 'react-redux'
import { ToastContainer, ToastMessage } from 'react-toastr'

import Chat from '../components'

const ToastMessageFactory = React.createFactory(ToastMessage.animation)

class LocalContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      user: '',
      users: [],
      messages: []
    }

    this.onMessageSubmit = this.onMessageSubmit.bind(this)
    this.onChangeName = this.onChangeName.bind(this)
  }

  componentDidMount() {
    this.props.socket.on('init', this._initialize.bind(this))
    this.props.socket.on('send:message', this._messageRecieve.bind(this))
    this.props.socket.on('user:join', this._userJoined.bind(this))
    this.props.socket.on('user:left', this._userLeft.bind(this))
    this.props.socket.on('change:name', this._userChangedName.bind(this))
  }

  _initialize(data) {
    const { users, name } = data
    this.setState({ users, user: name })
  }

  _messageRecieve(message) {
    const { messages } = this.state
    messages.push(message)
    this.setState({ messages })
  }

  _userJoined(data) {
    const { users, messages } = this.state
    const { name } = data
    users.push(name)
    messages.push({
      user: 'System',
      text: `${name} joined the chat`
    })
    this.setState({ users, messages })
  }

  _userLeft(data) {
    const { users, messages } = this.state
    const { name } = data
    const index = users.indexOf(name)
    users.splice(index, 1)
    messages.push({
      user: 'System',
      text: `${name} left the chat`
    })
    this.setState({ users, messages })
  }

  _userChangedName(data) {
    const { oldName, newName } = data
    const { users, messages } = this.state
    const index = users.indexOf(oldName)
    users.splice(index, 1, newName)
    messages.push({
      user: 'System',
      text: `${oldName} changed their name to ${newName}`
    })
    this.setState({ users, messages })
  }

  onMessageSubmit(message) {
    const { messages } = this.state
    messages.push(message)
    this.setState({ messages })
    this.props.socket.emit('send:message', message)
  }

  onChangeName(newName) {
    const oldName = this.state.user
    this.props.socket.emit('change:name', newName, (result) => {
      if (!result) {
        const message = 'This name is taken'
        const title = 'Error'

        this.toastError(message, title)
        return
      }
      const { users } = this.state
      const index = users.indexOf(oldName)
      users.splice(index, 1, newName)
      this.setState({ users, user: newName })
    })
  }

  toastError(message, title) {
    this.refs.container.error(
      message,
      title, {
        timeOut: 10000,
        closeButton: true
      }
    )
  }

  render() {
    return (
      <div>
        <Chat
          {...this.state}
          {...this.props}
          onMessageSubmit={this.onMessageSubmit}
          onChangeName={this.onChangeName}
        />

        <ToastContainer
          ref="container"
          toastMessageFactory={ToastMessageFactory}
          className="toast-top-right"
        />
      </div>
    )
  }
}

const mapStateToProps = ({ socket }) => ({ socket })

const mapDispatchToProps = {}

const ChatContainer = connect(mapStateToProps, mapDispatchToProps)(LocalContainer)

export default ChatContainer
