import React from "react";
import PropTypes from 'prop-types';
import "./Footer.css";

class Footer extends React.Component {
  
    render () {
      return (
          <footer>
              <div className="container">
              <h5 style={{marginTop:"4%"}}>Copywright Eric, Chris, James</h5>
              </div>
          </footer>
      );
    }
  }

export default Footer;