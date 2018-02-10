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
<nav className="navbar navbar-default">
<div className="container-fluid">
  <div className="navbar-header">
    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
      <span className="sr-only">Toggle navigation</span>
      <span className="icon-bar"></span>
      <span className="icon-bar"></span>
      <span className="icon-bar"></span>
    </button>
    <a className="navbar-brand" href="/books">Tiny Tracker</a>
  </div>
  <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
    <ul className="nav navbar-nav">
      <li><a href="/">Home <span className="sr-only">(current)</span></a></li>
      <li><a href="/">About</a></li>
      <li><a href="/">Features</a></li>
      <li><a href="/">Contact</a></li>
    </ul>
    <ul className="nav navbar-nav navbar-right">
    <li><SignOutButton /></li>
    </ul>
  </div>
</div>
</nav>

  

const NavigationNonAuth = () =>
<nav className="navbar navbar-default">
<div className="container-fluid">
  <div className="navbar-header">
    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
      <span className="sr-only">Toggle navigation</span>
      <span className="icon-bar"></span>
      <span className="icon-bar"></span>
      <span className="icon-bar"></span>
    </button>
    <a className="navbar-brand" href="/books">Tiny Tracker</a>
  </div>
  <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
    <ul className="nav navbar-nav">
      <li className="active"><a href="/">Home <span className="sr-only">(current)</span></a></li>
      <li><a href="/">About</a></li>
      <li><a href="/">Features</a></li>
      <li><a href="/">Contact</a></li>
    </ul>
  </div>
</div>
</nav>


export default Nav;
