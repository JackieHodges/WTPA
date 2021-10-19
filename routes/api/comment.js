const tripsController = require('../../controllers/tripsController');
const router = require('express').Router();

router.route("/:id")
  .get(tripsController.getTripComments)


module.exports = router;