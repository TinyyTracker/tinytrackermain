const path = require("path");
const router = require("express").Router();
const db = require("../models");

const itemFunctions = {
  findAll: function (req, res) {

    db.Item
    
      .find()
      // .where("email").equals(req.params.email)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByLocation: function (req, res) {
    console.log(req.params.location);
    db.Item
      .find()
      .where("location").equals(req.params.location)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Item
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Item
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Item
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Item
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
}

router.get("/api/items", itemFunctions.findAll)

router.get("/api/location/:location", itemFunctions.findByLocation)

router.get("/api/dashboard", itemFunctions.findAll)

router.post("/api/items", itemFunctions.create)

router.delete("/api/items/:id", itemFunctions.remove)

router.get("/api/items/:id", itemFunctions.findById)

router.patch("/api/items/:id", itemFunctions.update)

// If no API routes are hit, send the React app
router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
