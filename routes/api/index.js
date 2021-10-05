const router = require("express").Router();
const tripRoutes = require("./trips")

// trip routes
router.use("/trips", tripRoutes)

module.exports = router;
