const tripsController = require('../../controllers/tripsController');
const router = require('express').Router();

router.route("/")
  .get(tripsController.getAllTrips)
  .post(tripsController.createTrip)


module.exports = router;