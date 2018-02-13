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
      item: {},
      isUpdate: false,
      email: ""
    };
  }
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getItem(this.props.match.params.id)
      .then(res => this.setState({ item: res.data }))
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

    const updatedItem = {...this.state.item}
    updatedItem[name] = value

    this.setState({
      item: updatedItem
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.item.title && this.state.item.location) {
      API.patchItem(this.props.match.params.id, this.state.item)
        .then(res => this.setState({isUpdate:false}))
        .catch(err => console.log(err));
    }
  };

  getReadOnly = () => (
    <div className="signin-menu-background">
      <Nav />
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>
              {this.state.item.title} in {this.state.item.location}
            </h1>
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col size="md-10 md-offset-1">
          <article>
            <h1>Item Information</h1>
            <p>
              {this.state.item.note}
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
    <div className="signin-menu-background">
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
              value={this.state.item.title}
              onChange={this.handleInputChange}
              name="title"
              placeholder="Title (required)"
            />
            <Input
              value={this.state.item.location}
              onChange={this.handleInputChange}
              name="location"
              placeholder="Location (required)"
            />
            <TextArea
              value={this.state.item.note}
              onChange={this.handleInputChange}
              name="note"
              placeholder="Note (Optional)"
            />
            <button onClick={() => this.handleUpdate(false)}>Cancel</button>
            <FormBtn
              disabled={!(this.state.item.location && this.state.item.title)}
              onClick={this.handleFormSubmit}
            >
              Submit Item
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
