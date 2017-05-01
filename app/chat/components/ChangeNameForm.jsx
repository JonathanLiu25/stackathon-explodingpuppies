import React from 'react'

const ChangeNameForm = props => {
  const nameChangeHandler = props.nameChangeHandler
  const nameSubmitHandler = props.nameSubmitHandler
  const name = props.name

  return (
    <div className='chat-change-name-form'>
      <h3> Online Users </h3>
      <form onSubmit={nameSubmitHandler}>
        <input
          type="text"
          value={name}
          placeholder="Change your name"
          onChange={nameChangeHandler}
        />
      </form>
    </div>
  )
}

export default ChangeNameForm
