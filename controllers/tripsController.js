const db = require("../models");

// Defining methods for the tripsController
module.exports = {
  createTrip: function (req, res) {
    db.Trip
      .create({
        trip_name: req.body.trip_name
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getAllTrips: function (req, res) {
    db.Trip
      .findAll()
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
