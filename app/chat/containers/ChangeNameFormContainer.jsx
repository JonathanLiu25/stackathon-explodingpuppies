import React from 'react'
import { connect } from 'react-redux'

import ChangeNameForm from '../components/ChangeNameForm'

class ChangeNameFormContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      name: ''
    }

    this.nameChangeHandler = this.nameChangeHandler.bind(this)
    this.nameSubmitHandler = this.nameSubmitHandler.bind(this)
  }

  nameChangeHandler(event) {
    this.setState({ name: event.target.value })
  }

  nameSubmitHandler(event) {
    event.preventDefault()
    const newName = this.state.name

    this.props.onChangeName(newName)
    this.setState({ name: '' })
  }

  render() {
    return (
      <ChangeNameForm
        {...this.state}
        nameChangeHandler={this.nameChangeHandler}
        nameSubmitHandler={this.nameSubmitHandler} />
    )
  }
}

export default ChangeNameFormContainer
