import React from 'react'

const Navbar = ({ toggleDrawer }) => (
  <div className="navbar navbar-default">
    <div className="container-fluid">

      {/* Brand and toggle get grouped for better mobile display */}
      <div className="navbar-header" id="navbar">
        <button
          type="button"
          className="navbar-toggle collapsed"
          data-toggle="collapse"
          data-target="#navbar-collapse-target"
          aria-expanded="false">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
      </div>

      {/* Collect the nav links, forms, and other content for toggling */}
      <div className="collapse navbar-collapse" id="navbar-collapse-target">
        <ul className="nav navbar-nav">
          <li className="black-text" onClick={toggleDrawer}><a><p className="no-select">Toggle Chat</p></a></li>
        </ul>
      </div>
    </div>
  </div>
)

export default Navbar
