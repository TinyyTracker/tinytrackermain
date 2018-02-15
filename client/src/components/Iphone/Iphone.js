import React from "react";
import PropTypes from 'prop-types';
import "./Iphone.css";

class Iphone extends React.Component {
// Destructuring the type, className, children and onClick props, applying them to the button element

  render () {

    return (
      <div>
        <img className="iphone-photo" src="iphone_6_plus_white_port.png"/>
      </div>
    )
  }
}

// Input.props = {
//   name: PropTypes.string,
//   placeholder: PropTypes.string
// }

export default Iphone
