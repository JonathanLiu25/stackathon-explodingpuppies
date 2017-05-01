import React from 'react'
import { connect } from 'react-redux'

import Root from './component'

class LocalContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      openDrawer: true
    }
    this.toggleDrawer = this.toggleDrawer.bind(this)
  }

  toggleDrawer() {
    this.setState({ openDrawer: !this.state.openDrawer })
  }

  render() {
    return (
      <Root
        {...this.state}
        {...this.props}
        toggleDrawer={this.toggleDrawer}
      />
    )
  }
}

const mapStateToProps = ({ auth, socket }) => ({ user: auth, socket })

const mapDispatchToProps = {}

const RootContainer = connect(mapStateToProps, mapDispatchToProps)(LocalContainer)

export default RootContainer
