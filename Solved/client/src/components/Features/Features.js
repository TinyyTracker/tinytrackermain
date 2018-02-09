import React from "react";
import PropTypes from 'prop-types';
import "./Features.css";

class Features extends React.Component {
  
    render () {
      return (
        <div className="features-section">
        <div className="container">
        <div className="features-header">
        <h1>Never Lose Your Items Again!</h1>
        <h3 className="menu-sub">Check out what Tiny Tracker can do!</h3>
        </div>
        <div className="">
            <div className="col-xs-6 col-md-3 glyph-div">
            <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
            <h3>Item Tracker</h3>
            <h5>Guided By your Input, You'll never have to lose Grandma's Old picture Album again!</h5>
            </div>
            <div className="col-xs-6 col-md-3 glyph-div">
            <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
            <h3>Update Items</h3>
            <h5>You moved an item to a new location? Not A Problem! You're able to update the item's location with just the click of a button</h5>
            </div>
            <div className="col-xs-6 col-md-3 glyph-div">
            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
            <h3>Delete Items/Locations</h3>
            <h5>Don't care about an item anymore? Easily delete an item!</h5>
            </div>
            <div className="col-xs-6 col-md-3 glyph-div">
            <span class="glyphicon glyphicon-camera" aria-hidden="true"></span>
            <h3>Image Upload!</h3>
            <h5>The more information you enter into the app, the easier it is to find your items. Tiny Tracker supports picture identifiers and many more itendifying features!</h5>
            </div>
        </div>
        </div>
        </div>
      );
    }
  }

  

export default Features;