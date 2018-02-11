const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist",
  {
    useMongoClient: true
  }
);

const itemSeed = [
  {
    title: "Basball Bat",
    location: "basement",
    note:'In the right corner of the room',
    date: new Date(Date.now()),
    email: "test@test.com"
  },
  {
    title: "Chairs",
    location: "garage",
    note:'top back shelf',
    date: new Date(Date.now()),
    email: "test@test.com"
  },
  {
    title: "Pictures",
    location: "attic",
    note:'In blue box',
    date: new Date(Date.now()),
    email: "test@test.com"
  }
];

db.Item
  .remove({})
  .then(() => db.Item.collection.insertMany(itemSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
