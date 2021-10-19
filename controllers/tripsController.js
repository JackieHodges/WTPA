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
        userId: req.body.userId,
        is_admin: req.body.is_admin
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  deleteFriend: function (req, res) {
    db.Traveller
      .destroy({
        where: {
          id: req.params.id
        }
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
        include: {
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
  getTripComments: function (req, res) {
    db.Trip
      .findOne({
        where: {
          id: req.params.id
        },
        include: {
          model: db.Comment,
          include: {
            model: db.User
          }
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  addNewComment: function (req, res) {
    db.Comment
      .create({
        tripId: req.body.tripId,
        userId: req.body.userId,
        text: req.body.text
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  isAdmin: function (req, res) {
    db.Traveller
      .findOne({
        where: {
          userId: req.body.userId,
          tripId: req.body.tripId
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
  setVote: function (req, res) {
    db.Trip
      .update({
        voteData: req.body.voteData
      }, {
        where: {
          id: req.body.id
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
};
