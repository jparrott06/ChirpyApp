const User = require("../models/user");

exports.getAllUsers = (req, res) => {
    User.find({})
        .exec()
        .then(users => {
            res.render("users", { users: users })
        })
        .catch((error) => {
            console.log(error);
            return [];
        })
        .then(() => {
            console.log("Promise complete");
        })
};

exports.saveUser = (req, res) => {
    console.log(req.body);

    let newUser = new User({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Username: req.body.Username,
        Gender: req.body.Gender,
        Location: req.body.Location,
        Email: req.body.Email,
        Password: req.body.pass1,
        DoB: req.body.txtDoB,
        SecurityQuestion: req.body.ddSecurityQuestion,
        Answer: req.body.txtAnswer,
        Bio: req.body.txtareaBio
    });
    newUser.save()
    .then(() => {
        res.render("home")
    })
    .catch(error => { res.send(error) })
}

exports.getSignupPage = (req, res) => {
    res.render("signup");
}

exports.getSigninPage = (req, res) => {
    res.render("signin");
}

exports.postSigninUser = (req, res) => {
    let input_email = req.body.email;
    let input_password = req.body.password;

    if(User.find({Email: input_email, Password: input_password})) {
        res.render("home");
    }

    else {
        res.render("signin");
    }

}
