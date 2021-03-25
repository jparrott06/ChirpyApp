const express = require("express"), app = express(),
homeController = require("./controllers/homeController"),
errorController = require("./controllers/errorController"),
layouts = require("express-ejs-layouts"), mongoose = require("mongoose"),
usersController = require("./controllers/usersController");

mongoose.connect("mongodb://localhost:27017/chirpy_app", {useNewUrlParser: true});

app.set("port", process.env.PORT || 3000);

app.set("view engine", "ejs");
app.use(layouts);


app.get("/", homeController.showIndex);

app.use(express.static("public"))
app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(express.json());

app.get("/signup", usersController.getSignupPage);
app.post("/signup", usersController.saveUser);

app.get("/signin", usersController.getSigninPage);
app.post("/signin", usersController.postSigninUser);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
    console.log(`Server is running on port: ${app.get("port")}`);
});