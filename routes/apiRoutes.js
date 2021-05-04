const router = require("express").Router(),
usersController = require("../controllers/usersController"),
chirpsController = require("../controllers/chirpsController");

//router.get("/users", coursesController.index, coursesController.filterUserCourses, coursesController.respondJSON);
router.get("/users/:id/follow", usersController.follow, usersController.newfollower, usersController.respondJSON);
router.get("/users/:id/unfollow", usersController.unfollow, usersController.respondJSON);
router.get("/chirps/:hashtag", chirpsController.getHashtagChirps, usersController.respondJSON);

router.use(usersController.errorJSON);

module.exports = router;