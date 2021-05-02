const router = require("express").Router(),
usersController = require("../controllers/usersController");

//router.get("/users", coursesController.index, coursesController.filterUserCourses, coursesController.respondJSON);
router.get("/users/:id/follow", usersController.follow, usersController.respondJSON);
router.get("/users/:id/unfollow", usersController.unfollow, usersController.respondJSON);

router.use(usersController.errorJSON);

module.exports = router;