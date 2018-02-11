import React, {Component} from "react";
import { Link, withRouter } from 'react-router-dom';

import Nav from "../../components/Nav";
import Iphone from "../../components/Iphone";
import Features from "../../components/Features";
import { Col, Row, Container } from "../../components/Grid";
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';
import "./Signin.css";

const divStyle = {color: 'black'};

const SignInPage = ({ history }) =>
<div className="signin-menu-route">
<Nav />
<div className="buttcheeks">
<div>
    <div className="container signin-form">
    <div className="menu-txt">
    <div>
        <h1 style={divStyle}>Welcome to Tiny Tracker!</h1>
        <div>
        <h3 style={divStyle}></h3>
        <h3 style={divStyle}>Tiny Tracker is an app that will help you locate your lost items or anything else!</h3>
        </div>
    </div>
        <SignInForm history={history} />
        <Link to="/passwordforget">Forget Password?</Link>
        <br></br>
        <Link to={routes.SIGN_UP}><button type="button" className="btn" aria-label="Left Align">
  <span>Start Now For Free</span>
</button></Link>
</div>
</div>
</div>
<Features />
</div>
</div>

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};



class SignInForm extends Component {
  constructor(props) {
      super(props);
      
      this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
      const { email, password } = this.state;

      const { history } = this.props;

      auth.doSignInWithEmailAndPassword(email, password)
          .then(() => {
              this.setState(() => ({ ...INITIAL_STATE}));
              history.push(routes.ITEMS);
          })
          .catch(error => {
              this.setState(byPropKey('error', error));
          });

      event.preventDefault();
  }

  render() {
    const { email, password, error } = this.state;

  const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
                <input
                value={email}
                onChange={event =>this.setState(byPropKey('email', event.target.value))}
                type="text"
                placeholder="Email Address"
                className="form-control"
                />
                <input
                value={password}
                onChange={event =>this.setState(byPropKey('password', event.target.value))}
                type="password"
                placeholder="Password"
                className="form-control"
                />
                <button disabled={isInvalid} type="submit" className="btn" aria-label="Left Align">
  <span>Signin!</span>
</button>

                { error && <p>{error.message}</p>}
            </form>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};
