const router = require("express").Router();
const tripRoutes = require("./trips")
const userRoutes = require("./user")

// trip routes
router.use("/trips", tripRoutes)
router.use("/user", userRoutes)

module.exports = router;
