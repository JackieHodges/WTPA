const tripsController = require('../../controllers/tripsController');
const router = require('express').Router();

router.route("/")
  .post(tripsController.addAssociation)


module.exports = router;