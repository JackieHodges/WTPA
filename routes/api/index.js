const router = require("express").Router();
const tripRoutes = require("./trips")
const userRoutes = require("./user")
const commentRoutes = require("./comment")

// trip routes
router.use("/trips", tripRoutes)
router.use("/user", userRoutes)
router.use("/comment", commentRoutes)

module.exports = router;
