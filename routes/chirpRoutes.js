const router = require("express").Router(),
chirpsController = require("../controllers/chirpsController");


router.get("/", chirpsController.getAllChirps, chirpsController.indexView);
router.get("/new", chirpsController.new);
router.post("/create", 
chirpsController.create,
chirpsController.getAllChirps, 
chirpsController.redirectView);
router.get("/:id", chirpsController.show, chirpsController.showView);
router.get("/:id/edit", chirpsController.edit);
router.put("/:id/update", chirpsController.update, chirpsController.redirectView);
router.delete("/:id/delete", chirpsController.delete, chirpsController.redirectView);
module.exports = router;