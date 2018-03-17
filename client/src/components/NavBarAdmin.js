import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import 'bootstrap/dist/css/bootstrap.css';
import '../index.css';
import { NavLink } from 'react-router-dom';
import { BrowserRouter as Router, Route,} from "react-router-dom";


function NavBar (props) {
  const { user, onSignOut = () => {} } = props;
    return (
      <Router>
        <nav className="NavBar d-flex pt-2">

          {/* User NavBar */}
          {/* <div className="mr-auto pt-2">
            <Icon name= "code" color='red' className="logo mr-auto pt-2 pl-4 pr-5" />
            <NavLink exact to="/" className="mr-auto">Drillz</NavLink>
            <span>|</span>
            <NavLink exact to="/" className="mr-auto">Leaderboard</NavLink>
          </div>
          <div className="d-flex pt-2">
            <p>Hello, Username</p>
            <span>|</span>
            <NavLink exact to="/" >Profile</NavLink>
            <span>|</span>
            <NavLink exact to="/" className="pr-4">Logout</NavLink>
          </div> */}

          {/* Admin NavBar */}

          <Icon name= "code" color='red' className="logo mr-auto pt-2 pl-4" />
          <NavLink exact to="/">Home</NavLink>
          <span>|</span>
          <NavLink exact to="/" >Drill</NavLink>
          <span>|</span>
          <NavLink exact to="/" className="pr-4">Sign In</NavLink>

        </nav>
    </Router>
    )
}

export default NavBar;
