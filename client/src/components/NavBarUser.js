import React from 'react';
import { Icon } from 'semantic-ui-react';
import 'bootstrap/dist/css/bootstrap.css';
import '../index.css';
import { NavLink } from 'react-router-dom';
import { BrowserRouter as Router, Route,} from "react-router-dom";


function NavBar (props) {
  const { user, onSignOut = () => {} } = props;
    return (
      <Router>
          {

            user.is_admin ? (
               // Admin NavBar
            <nav className="NavBar d-flex pt-2">
              <Icon name= "code" color='red' className="logo mr-auto pt-2 pl-4" />
              <NavLink exact to="/">Home</NavLink>
              <span>|</span>
              <NavLink exact to="/" >Drill</NavLink>
              <span>|</span>
              {
                user ? (
                  [ <span key="1">Hello, {user.full_name}</span>
                  , <a key="2" href="/sign_out" onClick={onSignOut}>Sign Out</a>
                  ]
                ) : (
                  <NavLink exact to="/sign_in">Sign In</NavLink>
                )
              }
            </nav>
            ) : (
              // User NavBar
              <nav className="NavBar d-flex pt-2">
                <div className="mr-auto pt-2">
                  <Icon name= "code" color='red' className="logo mr-auto pt-2 pl-4 pr-5" />
                  <NavLink exact to="/" className="mr-auto">Drillz</NavLink>
                  <span>|</span>
                  <NavLink exact to="/" className="mr-auto">Leaderboard</NavLink>
                </div>
                <div className="d-flex pt-2">
                  {
                    user ? (
                      [ <span key="1">Hello, {user.full_name}</span>
                      , <a key="2" href="/sign_out" onClick={onSignOut}>Sign Out</a>
                      ]
                    ) : (
                      <NavLink exact to="/sign_in">Sign In</NavLink>
                    )
                  }
                </div>
              </nav>
            )
          }



          {/* Public Navbar */}
          {/* <div className="mr-auto pt-2">
            <Icon name= "code" color='red' className="logo mr-auto pt-2 pl-4 pr-5" />
            <NavLink exact to="/" className="mr-auto">Available Students</NavLink>
            <span>|</span>
            <NavLink exact to="/" className="mr-auto">All Students</NavLink>
          </div>
          <div className="d-flex pt-2">
            <NavLink exact to="/" >Sign In</NavLink>
            <span>|</span>
            <NavLink exact to="/" className="pr-4">Sign Out</NavLink>
          </div> */}


    </Router>
    )
}

export default NavBar;
