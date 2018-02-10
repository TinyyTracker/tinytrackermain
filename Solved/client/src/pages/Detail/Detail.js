import React from "react";
import { Link } from "react-router-dom";
import Nav from "../../components/Nav";
import { Col, Row, Container } from "../../components/Grid";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";

import { firebase } from '../../firebase';

class Detail extends React.Component {
  constructor(props, { authUser }) {
    super(props);
    this.state = {
      book: {},
      isUpdate: false,
      email: ""
    };
  }
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getBook(this.props.match.params.id)
      .then(res => this.setState({ book: res.data }))
      .catch(err => console.log(err));

      firebase.auth.onAuthStateChanged(authUser => {
        this.setState({"email": authUser.email});
      })
  }

  handleUpdate(isUpdate) {
    this.setState({ isUpdate: isUpdate })
  }

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;

    const updatedBook = {...this.state.book}
    updatedBook[name] = value

    this.setState({
      book: updatedBook
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.book.title && this.state.book.author) {
      API.patchBook(this.props.match.params.id, this.state.book)
        .then(res => this.setState({isUpdate:false}))
        .catch(err => console.log(err));
    }
  };

  getReadOnly = () => (
    <div>
      <Nav />
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>
              {this.state.book.title} in {this.state.book.author}
            </h1>
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col size="md-10 md-offset-1">
          <article>
            <h1>Item Information</h1>
            <p>
              {this.state.book.synopsis}
            </p>
          </article>
        </Col>
      </Row>
      <Row>
        <button 
        type="button" 
        className="btn"
        style={{backgroundColor:"#431c5d"}} 
        aria-label="Left Align"
        onClick={() => this.handleUpdate(true)}
        >
  <span>Update Item!</span>
</button>
        <Col size="md-2">
          <Link to="/books">← Back to Dashboard</Link>
        </Col>
      </Row>
    </Container>
    </div>
  );

  getUpdateform = () => (
    <div>
      <Nav />
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>Edit Item</h1>
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col size="md-10 md-offset-1">
          <form>
            <Input
              value={this.state.book.title}
              onChange={this.handleInputChange}
              name="title"
              placeholder="Title (required)"
            />
            <Input
              value={this.state.book.author}
              onChange={this.handleInputChange}
              name="author"
              placeholder="Author (required)"
            />
            <TextArea
              value={this.state.book.synopsis}
              onChange={this.handleInputChange}
              name="synopsis"
              placeholder="Synopsis (Optional)"
            />
            <button onClick={() => this.handleUpdate(false)}>Cancel</button>
            <FormBtn
              disabled={!(this.state.book.author && this.state.book.title)}
              onClick={this.handleFormSubmit}
            >
              Submit Book
            </FormBtn>
          </form>
        </Col>
      </Row>
    </Container>
    </div>
  );

  render() {
    if(this.state.email === ""){
      return null
    } else {
      if (this.state.isUpdate) return this.getUpdateform();
      else return this.getReadOnly();
    }
   
  }
}

export default Detail;
