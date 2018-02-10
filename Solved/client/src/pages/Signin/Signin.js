import React, {Component} from "react";
import { Link, withRouter } from 'react-router-dom';

import Nav from "../../components/Nav";
import Iphone from "../../components/Iphone";
import Features from "../../components/Features";
import { Col, Row, Container } from "../../components/Grid";
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';
import "./Signin.css";

const divStyle = {color: 'white'};

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
<div>
<Iphone />
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
      const {
          email,
          password,
      } = this.state;

      const {
          history,
      } = this.props;

      auth.doSignInWithEmailAndPassword(email, password)
          .then(() => {
              this.setState(() => ({ ...INITIAL_STATE}));
              history.push(routes.BOOKS);
          })
          .catch(error => {
              this.setState(byPropKey('error', error));
          });

      event.preventDefault();
  }


// class Books extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       books: [],
//       title: "",
//       author: "",
//       synopsis: ""
//     };
//   }

//   handleRoute = event => {
//     event.preventDefault();
//     window.location.href="/books"
// }
  // When the component mounts, load all books and save them to this.state.books
//   componentDidMount() {
//     this.loadBooks();
//   }

  // Loads all books  and sets them to this.state.books
//   loadBooks = () => {
//     API.getBooks()
//       .then(res =>
//         this.setState({ books: res.data, title: "", author: "", synopsis: "" })
//       )
//       .catch(err => console.log(err));
//   };

  // Deletes a book from the database with a given id, then reloads books from the db
//   deleteBook = id => {
//     API.deleteBook(id)
//       .then(res => this.loadBooks())
//       .catch(err => console.log(err));
//   };

  // Handles updating component state when the user types into the input field
  // handleInputChange = event => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   });
  // };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   if (this.state.title && this.state.author) {
  //     API.saveBook({
  //       title: this.state.title,
  //       author: this.state.author,
  //       synopsis: this.state.synopsis
  //     })
  //       .then(res => this.loadBooks())
  //       .catch(err => console.log(err));
  //   }
  // };

  render() {
    const {
      email,
      password,
      error,
  } = this.state;

  const isInvalid =
      password === '' ||
      email === '';

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
