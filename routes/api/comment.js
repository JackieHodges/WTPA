const tripsController = require('../../controllers/tripsController');
const router = require('express').Router();

router.route("/")
  .post(tripsController.addNewComment)

router.route("/:id")
  .get(tripsController.getTripComments)


module.exports = router;