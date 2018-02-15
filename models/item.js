const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  note: String,
  date: { type: Date, default: Date.now },
  email: String
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
