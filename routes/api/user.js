const tripsController = require('../../controllers/tripsController');
const router = require('express').Router();

router.route("/associate")
  .post(tripsController.addAssociation)

router.route("/delete/:id")
  .delete(tripsController.deleteFriend)

router.route("/:id")
  .get(tripsController.getMyTrips)

router.route("/find")
  .post(tripsController.findOrCreateUser)

router.route("/friend")
  .post(tripsController.findOrCreateFriend)

router.route("/admin")
  .post(tripsController.isAdmin)

module.exports = router;