"use strict";
const express = require("express"), app = express(), router = express.Router(),
homeController = require("./controllers/homeController"),
errorController = require("./controllers/errorController"),
chirpsController = require("./controlllers/chirpsController"),
usersController = require("./controller/usersController"),
methodOverride = require("method-override"),
layouts = require("express-ejs-layouts"), mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/chirpy_app", {useNewUrlParser: true});
mongoose.set("useCreateIndex", true);
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
app.use(
    express.urlencoded({
        extended: false
    })
);


router.use(express.json());

router.use(layouts);

router.use(express.static("public"))
router.use(methodOverride("_method", {methods:['POST', 'GET']}))


app.get("/", homeController.showIndex);
// new additions with router

router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);
router.delete("/users/:id/delete", usersController.delete,usersController.redirectView);

router.get("/chirps", chirpsController.index, chirpsController.indexView);
router.get("/chirps/new", chirpsController.new);
router.post("/chirps/create", chirpsController.create, chirpsController.redirectView);
router.get("/chirps/:id", chirpsController.show, chirpsController.showView);
router.get("/chirps/:id/edit", chirpsController.edit);
router.put("/chirps/:id/update", chirpsController.update, chirpsController.redirectView);
router.delete("/chirps/:id/delete", chirpsController.delete,chirpsController.redirectView);


// previous stuff-may need to edit
app.get("/signup", usersController.getSignupPage);
app.post("/signup", usersController.saveUser);

app.get("/signin", usersController.getSigninPage);
app.post("/signin", usersController.postSigninUser);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
    console.log(`Server is running on port: ${app.get("port")}`);
});