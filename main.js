"use strict";

const user = require("./models/user");

const express = require("express"), app = express(), router = require("./routes/index"),
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

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/chirpy_app", 
{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
mongoose.set("useCreateIndex", true);

const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});


app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);

app.use(express.static("public"))
app.use(layouts);
app.use(expressValidator());
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(methodOverride("_method", {methods:['POST', 'GET']}));

app.use(express.json());

app.use(cookieParser("my_passcode"));
app.use(expressSession({
    secret: "my_passcode",
    cookie: {
        maxAge: 36000000
    },
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(connectFlash());

app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
})

// new additions with router

// router.get("/users", usersController.index, usersController.indexView);
// router.get("/users/new", usersController.new);
// router.post("/users/create", usersController.create, usersController.redirectView);
// router.get("/users/:id", usersController.show, usersController.showView);
// router.get("/users/:id/edit", usersController.edit);
// router.put("/users/:id/update", usersController.update, usersController.redirectView);
// router.delete("/users/:id/delete", usersController.delete,usersController.redirectView);

// previous stuff-may need to edit

// router.get("/signup", usersController.getSignupPage);
// router.post("/signup", usersController.saveUser);

// router.get("/signin", usersController.getSigninPage);
// router.post("/signin", usersController.postSigninUser);

app.use("/", router);

app.listen(app.get("port"), () => {
    console.log(`Server is running on port: ${app.get("port")}`);
});