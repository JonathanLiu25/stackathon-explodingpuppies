import React from 'react'

import Login from '../components/Login'
import WhoAmI from '../components/WhoAmI'
import Navbar from '../navigation/containers'
import Chat from '../chat/containers'

const Root = ({ user, children, openDrawer, toggleDrawer }) => (
  <div>
    {/* <nav>
      {user ? <WhoAmI /> : <Login />}
    </nav> */}
    <Navbar toggleDrawer={toggleDrawer}/>
    <div className="container">
      {children}
      <Chat openDrawer={openDrawer}/>
    </div>
  </div>
)

export default Root
