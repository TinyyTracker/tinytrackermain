import React, {Component} from "react";
import { Link, withRouter } from 'react-router-dom';

import Jumbotron from "../../components/Jumbotron";

import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';

const SignUpPage = ({history}) =>
    <div className="signin-form">
        <h1>Sign Up Page</h1>
        <SignUpForm history={history} />
    </div>
    
const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class SignUpForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE};
    }

    onSubmit = (event) => {
        const {
            username,
            email,
            passwordOne,
        } = this.state;

        const {
            history,
        } = this.props;

        auth.doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                this.setState(() => ({ ...INITIAL_STATE}));
                history.push(routes.BOOKS);
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });

            event.preventDefault();

    }

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input
                value={username}
                onChange={event => this.setState(byPropKey('username', event.target.value))}
                type="text"
                placeholder="Full Name"
                className="form-control" 
                />
                <input
                value={email}
                onChange={event => this.setState(byPropKey('email', event.target.value))}
                type="text"
                placeholder="Email Address"
                className="form-control"
                />
                <input
                value={passwordOne}
                onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                type="password"
                placeholder="Password"
                className="form-control"
                />
                <input
                value={passwordTwo}
                onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                type="password"
                placeholder="Confirm Password"
                className="form-control"
                />
                <button disabled={isInvalid} type="submit" type="button" className="btn btn-danger" aria-label="Left Align">
  <span className="glyphicon glyphicon-play glyphicon-align-left" aria-hidden="true"></span><span>Sign Up!</span>
</button>

                { error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignUpLink = () =>
<p>
    Do not have an account?
    
    <Link to={routes.SIGN_UP}>Sign Up</Link>
    </p>


export default withRouter(SignUpPage);

export {
    SignUpForm,
    SignUpLink,
};