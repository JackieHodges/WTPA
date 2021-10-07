const tripsController = require('../../controllers/tripsController');
const router = require('express').Router();

router.route("/")
  .post(tripsController.addAssociation)

router.route("/find")
  .post(tripsController.findOrCreateUser)

module.exports = router;