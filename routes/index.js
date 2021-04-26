const router = require("express").Router(),
userRoutes = require("./userRoutes"),
errorRoutes = require("./errorRoutes"),
homeRoutes = require("./homeRoutes"),
chirpRoutes = require("./chirpRoutes");
// apiRoutes = require("./apiRoutes");

router.use("/users", userRoutes);
router.use("/chirps", chirpRoutes);
// router.use("/api",apiRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;