const router = require("express").Router(),
usersController = require("../controllers/usersController"),
chirpsController = require("../controllers/chirpsController");


router.get("/signin", usersController.getSigninPage);
router.post("/signin", usersController.authenticate);
router.get("/signup", usersController.getSignupPage);

router.post("/signup", 
    usersController.validate, 
    usersController.create, 
    usersController.redirectView);

router.get("/home", chirpsController.getAllChirps, usersController.getAllUsers, usersController.getHome);
router.get("/logout", usersController.logout, usersController.redirectView);

router.get("/:id", usersController.getUserChirps, usersController.showView);
router.get("/:id/edit", usersController.edit);
router.put("/:id/update", usersController.update, usersController.redirectView);
router.get("/:id/delete", usersController.deleteCheck);
router.delete("/:id/delete", usersController.delete, usersController.redirectView);

module.exports = router;

