import React from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      title: "",
      location: "",
      note: ""
    };
  }

  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    this.loadItems();
  }

  // Loads all books  and sets them to this.state.books
  loadItems = () => {
    API.getItems()
      .then(res =>
        this.setState({ items: res.data, title: "", location: "", note: "" })
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  deleteItems = id => {
    API.deleteItem(id)
      .then(res => this.loadItems())
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.location) {
      API.saveItem({
        title: this.state.title,
        location: this.state.location,
        note: this.state.note
      })
        .then(res => this.loadItems())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>this is Dashboard Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.location}
                onChange={this.handleInputChange}
                name="location"
                placeholder="Location (required)"
              />
              <TextArea
                value={this.state.note}
                onChange={this.handleInputChange}
                name="note"
                placeholder="Note (Optional)"
              />
              <FormBtn
                disabled={!(this.state.location && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Submit Item
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>HUH On My List</h1>
            </Jumbotron>
            {this.state.items.length ? (
              <List>
                {this.state.items.map(item => {
                  return (
                    <ListItem key={item._id}>
                      <a href={"/items/" + item._id}>
                        <strong>
                          {item.title} by {item.location}
                        </strong>
                      </a>
                      <DeleteBtn onClick={() => this.deleteItem(item._id)} />
                    </ListItem>
                  );
                })}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Dashboard;
