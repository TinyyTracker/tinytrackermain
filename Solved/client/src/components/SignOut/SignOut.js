import React from 'react';
import "./Signout.css";
import { auth } from '../../firebase';

const SignOutButton = () =>
    // <button
    // type="button"
    // onClick={auth.doSignOut}
    // >
    //     Sign Out
    // </button>
    <button onClick={auth.doSignOut} type="button" className="btn" aria-label="Right Align">
    <span className="glyphicon glyphicon-play glyphicon-align-left" aria-hidden="true"></span><span>Signout</span>
  </button>

export default SignOutButton;