import React from "react";
import PropTypes from 'prop-types';
import "./Download.css";

class Download extends React.Component {
  
    render () {
      return (
        <div id="mobile-app">
        <div className="container">
        <div className="features-header">
        <h1>Get It anywhere!</h1>
        <h3 className="menu-sub">Download Tiny Tracker On Any Mobile Device!</h3>
        </div>
        <div className="featured-content">
        <img src="https://www.forklift-international.com/media/google-play-badge.svg" style={{height:"200px",width:"200px"}} alt="app store"/>
        <img src="https://cdn.worldvectorlogo.com/logos/download-on-the-app-store-apple.svg" style={{height:"200px",width:"200px"}} alt="app store"/>
        </div>
        </div>
        </div>
      );
    }
  }

  

export default Download;