"use strict";
const express = require("express"), app = express(), router = express.Router(),
homeController = require("./controllers/homeController"),
errorController = require("./controllers/errorController"),
chirpsController = require("./controllers/chirpsController"),
usersController = require("./controllers/usersController"),
methodOverride = require("method-override"),
layouts = require("express-ejs-layouts"), mongoose = require("mongoose"),
passport = require("passport"),
cookieParser = require("cookie-parser"),
expressSession = require("express-session"),
expressValidator = require("express-validator"),
connectFlash = require("connect-flash"),
User = require("./models/user");

mongoose.connect("mongodb://localhost:27017/chirpy_app", 
{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);


router.use(express.static("public"))
router.use(layouts);
router.use(expressValidator());
router.use(express.json());
router.use(
    express.urlencoded({
        extended: false
    })
);
router.use(methodOverride("_method", {methods:['POST', 'GET']}))

router.use(cookieParser("my_passcode"));
router.use(expressSession({
    secret: "my_passcode",
    cookie: {
        maxAge: 360000
    },
    resave: false,
    saveUninitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
router.use(connectFlash());

router.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
})


router.get("/", homeController.showIndex);
// new additions with router

// router.get("/users", usersController.index, usersController.indexView);
// router.get("/users/new", usersController.new);
// router.post("/users/create", usersController.create, usersController.redirectView);
// router.get("/users/:id", usersController.show, usersController.showView);
// router.get("/users/:id/edit", usersController.edit);
// router.put("/users/:id/update", usersController.update, usersController.redirectView);
// router.delete("/users/:id/delete", usersController.delete,usersController.redirectView);

router.get("/users/signin", usersController.getSigninPage);
router.get("/users/signup", usersController.getSignupPage);
router.get("/users/:id/edit", usersController.edit);

router.post("/users/signup", 
    usersController.validate, 
    usersController.create, 
    usersController.redirectView);

router.get("/chirps", chirpsController.index, chirpsController.indexView);
router.get("/chirps/new", chirpsController.new);
router.post("/chirps/create", chirpsController.create, chirpsController.redirectView);
router.get("/chirps/:id", chirpsController.show, chirpsController.showView);
router.get("/chirps/:id/edit", chirpsController.edit);
router.put("/chirps/:id/update", chirpsController.update, chirpsController.redirectView);
router.delete("/chirps/:id/delete", chirpsController.delete,chirpsController.redirectView);


// previous stuff-may need to edit

// router.get("/signup", usersController.getSignupPage);
// router.post("/signup", usersController.saveUser);

// router.get("/signin", usersController.getSigninPage);
// router.post("/signin", usersController.postSigninUser);

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

app.use("/", router);

app.listen(app.get("port"), () => {
    console.log(`Server is running on port: ${app.get("port")}`);
});