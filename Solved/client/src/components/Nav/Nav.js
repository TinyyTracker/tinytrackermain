import React from "react";
import "./Nav.css";

import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';
// import * as routes from '../../constants/routes';


const Nav = (props, { authUser }) =>
  <div>
    { authUser
        ? <NavigationAuth />
        : <NavigationNonAuth />
    }
  </div>

Nav.contextTypes = {
    authUser: PropTypes.object,
};


const NavigationAuth = () =>
  <nav className="navbar navbar-inverse navbar-top">
    <div className="container-fluid">
      <div className="navbar-header">   
        <a href="/books" className="navbar-brand">
          Tiny Tracker
        </a>
      </div>
      <ul className="nav navbar-nav">
        <li className="active nav-list-item"><a href="/books">Link <span class="sr-only">(current)</span></a></li>
        <li className="nav-list-item"><a href="/books">Link</a></li>
        </ul>
      <ul className="nav navbar-nav navbar-right">
      <li><SignOutButton /></li>
    </ul>
    </div>
  </nav>

  

const NavigationNonAuth = () =>
  <nav className="navbar navbar-inverse navbar-top">
    <div className="container-fluid">
      <div className="navbar-header">   
        <a href="/books" className="navbar-brand">
          Tiny Tracker
        </a>
        <ul className="nav navbar-nav">
        <li className="active nav-list-item"><a href="/books">Link <span className="sr-only">(current)</span></a></li>
        <li className="nav-list-item"><a href="/books">Link</a></li>
        </ul>
      </div>
     </div>
  </nav>


export default Nav;
