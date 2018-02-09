import React from "react";
import PropTypes from 'prop-types';
import "./Features.css";

class Features extends React.Component {
  
    render () {
      return (
        <div className="container features-section">
        <h1>Never Lose Your Items Again!</h1>
        <h3>Check out what Tiny Tracker can do!</h3>
        <div className="">
            <div className="glyph-div">
            <span class="glyphicon glyphicon-search" aria-hidden="true"></span>            </div>
            <h3>Hello!</h3>
            <h5>Lorem ipsum all day baby</h5>
            <div className="glyph-div">
            <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
            <h3>Hello!</h3>
            <h5>Lorem ipsum all day baby</h5>
            </div>
            <div className="glyph-div">
            <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
            <h3>Hello!</h3>
            <h5>Lorem ipsum all day baby</h5>
            </div>
            <div className="glyph-div">
            <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
            <h3>Hello!</h3>
            <h5>Lorem ipsum all day baby</h5>
            </div>
        </div>

    </div>
      );
    }
  }

export default Features;