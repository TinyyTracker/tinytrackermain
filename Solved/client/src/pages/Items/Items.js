import React from "react";
import Jumbotron from "../../components/Jumbotron";
import Nav from "../../components/Nav";
import DeleteBtn from "../../components/DeleteBtn";
import Dropdown from "../../components/Dropdown";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { auth } from '../../firebase';
import SignInForm from '../Signin';
// Import other components hereeeeee


import withAuthorization from '../../components/Authorization';
import { firebase } from '../../firebase';

class Items extends React.Component {
  constructor(props, { authUser }) {
    super(props);
    this.state = {
      items: [],
      title: "",
      location: "",
      note: "",
      sLocation: "",
      unique: [],
      email: ""
    };
  }


  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    this.loadItems();
    firebase.auth.onAuthStateChanged(authUser => {
        this.setState({"email": authUser.email});
    })
  }

  // Loads all books  and sets them to this.state.books
  loadItems = () => {
    if (this.state.sLocation === "" || this.state.sLocation === "All Locations" || this.state.sLocation === "Select Location"){
    API.getItems()
      .then(res =>{
        console.log("RES ---------------- " + res.data);
        this.setState({ items: res.data, title: "", location: "", note: "" })
        console.log("RES2 ---------------- " );
      })
      .catch(err => console.log(err));
    } else {
      API.getLocation(this.state.sLocation)
      .then(res =>
        this.setState({ items: res.data, title: "", location: "", note: "" })
        
      )
      .catch(err => console.log(err));
    }
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  deleteItem = id => {
    API.deleteItem(id)
      .then(res => this.loadItems())
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value});
  };
  handleLocationChange = event => {
    this.setState({unique: []});
    console.log(this.state.unique);
    console.log(event.target.value);
    console.log("1st sLocation: "+ this.state.sLocation);
    this.setState({sLocation: event.target.value},this.loadItems);
    console.log(event.target.value);
    console.log("2nd sLocation: "+ this.state.sLocation);
    // this.loadBooks(this.state.sLocation);

    
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  handleFormSubmit = event => {
    event.preventDefault();
    // this.setState({unique: []});
    // console.log(this.state.unique);
console.log("++++++++++++++++++" + this.state.email);
    if (this.state.title && this.state.location) {
      API.saveItem({
        title: this.state.title,
        location: this.state.location,
        note: this.state.note,
        email: this.state.email
      })
        .then(res => this.loadItems())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div className="signin-menu-background">
        <Nav />
      <Container fluid>
        <Row style={{marginBotton:"10%"}}>
        <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Find My Items</h1>
            </Jumbotron>
            <div className="form-group">
        <select className="form-control"
        value={this.state.sLocation}
        onChange={this.handleLocationChange}
        style={{width:"100%"}} 
        // onClick={this.loadBooks(this.handleLocationChange)}
        name="sLocation"
        
        >
          <option value="Select Location">Select Location</option>
          <option value="All Locations">All Locations</option>
          
          {this.state.items.map(item => {
            console.log(this.state.unique);
            console.log(item);
            if (this.state.unique.indexOf(item.location) < 0){
              console.log("here " + this.state.unique);
              this.state.unique.push(item.location);
            return (
              <option value={item.location}>{item.location}</option>   
                   
            );
          } 
          })}
    
              <option value={this.state.unique[0]}>{this.state.unique[0]}</option>
        </select>
      </div>
            {this.state.items.length ? (
              <List>
                {this.state.items.map(item => {

                  if(item.email === this.state.email){

                  return (
                    <ListItem key={item._id}>
                      <a href={"/items/" + item._id}>
                        <strong>
                          {item.title} in {item.location}
                        </strong>
                      </a>
                      <DeleteBtn onClick={() => this.deleteItem(item._id)} />
                    </ListItem>
                  );
                }

                })}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
          <Col size="md-6">
            <Jumbotron>
              <h1>Create an Item</h1>
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
                placeholder="Location required"
              />
              <TextArea
                value={this.state.note}
                onChange={this.handleInputChange}
                name="note"
                placeholder="Additional Notes"
              />
              <FormBtn
                disabled={!(this.state.location && this.state.title)}
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
  }
}

const authCondition = (authUser) => !!authUser;


export default withAuthorization(authCondition)(Items);
