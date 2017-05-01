import React from 'react'
import { Link } from 'react-router'
import Drawer from 'material-ui/Drawer'

import Users from './Users'
import MessageList from './MessageList'
import MessageForm from '../containers/MessageFormContainer'
import ChangeNameForm from '../containers/ChangeNameFormContainer'

const Chat = props => {
  const user = props.user
  const users = props.users
  const messages = props.messages
  const onMessageSubmit = props.onMessageSubmit
  const onChangeName = props.onChangeName
  const openDrawer = props.openDrawer

  return (
    <Drawer
      width={300}
      openSecondary={true}
      open={openDrawer}
    >
      <div className="chat-container">

        <ChangeNameForm
          onChangeName={onChangeName}
        />

        <Users
          users={users}
        />

        <MessageForm
          user={user}
          onMessageSubmit={onMessageSubmit}
        />

        <hr />

        <MessageList
          messages={messages}
        />

      </div>
    </Drawer>
  )
}

export default Chat
