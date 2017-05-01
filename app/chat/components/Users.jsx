import React from 'react'

const Users = props => {
  const users = props.users

  return (
    <div className='chat-users'>
      <ul>
        {users.map((user, i) => (
          <li key={i}>
            {user}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users
