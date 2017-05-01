'use strict'
import React from 'react'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { connect } from 'react-redux'

import Root from './root'
import Jokes from './components/Jokes'
import NotFound from './components/NotFound'

import Lobby from './lobby/containers'
import ExplodingPuppies from './explodingpuppies/containers'
import Chat from './chat/containers'

const Routes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={Root}>
      <IndexRedirect to="/lobby" />
      <Route path="/lobby" component={Lobby} />
      <Route path="/explodingpuppies" component={ExplodingPuppies} />
      <Route path="/jokes" component={Jokes} />
    </Route>
    <Route path='*' component={NotFound} />
  </Router>
)

export default Routes
