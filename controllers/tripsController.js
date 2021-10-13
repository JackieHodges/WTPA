const db = require("../models");

// Defining methods for the tripsController
module.exports = {
  createTrip: function (req, res) {
    db.Trip
      .create({
        trip_name: req.body.trip_name,
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  addAssociation: function (req, res) {
    db.Traveller
      .create({
        trip_id: req.body.tripId,
        user_id: req.body.userId
        // req.body
      }
      )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getAllTrips: function (req, res) {
    db.Trip
      .findAll()
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findOrCreateUser: function (req, res) {
    db.User
      .findOrCreate({
        where: { email: req.body.email },
        defaults: {
          auth_o_id: req.body.auth_o_id,
          user_name: req.body.name
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
};
