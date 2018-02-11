import axios from "axios";

export default {
  // Gets all books
  getItems: function () {
    return axios.get("/api/items");
  },
  getLocation: function (location) {
    return axios.get("/api/location/" + location);
  },
  // Deletes the book with the given id
  deleteItem: function (id) {
    return axios.delete("/api/items/" + id);
  },
  // Saves a book to the database
  saveItem: function (itemData) {
    return axios.post("/api/items", itemData);
  },
  // Gets the book with the given id
  getItem: function (id) {
    return axios.get("/api/items/" + id);
  },
  patchItem: function (id, itemData) {
    return axios.patch("/api/items/" + id, itemData);
  },
};
