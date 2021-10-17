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
        tripId: req.body.tripId,
        userId: req.body.userId
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getAllTrips: function (req, res) {
    db.Trip
      .findAll()
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getThisTrip: function (req, res) {
    db.Trip
      .findOne({
        where: {
          id: req.params.id
        },
        include:{
          model: db.User
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getMyTrips: function (req, res) {
    db.Traveller
      .findAll({
        where: {
          userId: req.params.id
        },
        include: {
          model: db.Trip
        }
      })
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
  findOrCreateFriend: function (req, res) {
    db.User
      .findOrCreate({
        where: { email: req.body.email },
        defaults: {
          auth_o_id: null,
          user_name: null
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
};
