const tripsController = require('../../controllers/tripsController');
const router = require('express').Router();

router.route("/")
  .get(tripsController.getAllTrips)
  .post(tripsController.createTrip)

router.route("/:id")
  .get(tripsController.getThisTrip)

module.exports = router;