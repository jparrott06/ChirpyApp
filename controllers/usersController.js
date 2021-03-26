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


    //var passerror = "";

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
        res.render("home");
    })
    .catch(error => { res.send(error) })
}

exports.getSignupPage = (req, res) => {
    res.render("signup");
}

exports.getSigninPage = (req, res) => {
    console.log("Route to Signup page");
    res.render("signin", {error: false});
}

exports.postSigninUser = (req, res) => {
    let input_email = req.body.email;
    let input_password = req.body.password;

    console.log(req.body);

    User.findOne({Email: input_email, Password: input_password}).select('Email Password')
        .exec()
        .then((user) => {
            console.log("user: " + user);
            console.log("password: " + user.Password);
            console.log("email: " + user.Email);
            if (user.Password == input_password && user.Email == input_email) {
            res.render("home");
            }
        })
        .catch((error) => {
            console.log(error);
            //alert('The provided information does not match our records.');
            //res.send(error);
            res.render("signin", {error: "Error: Email doesn't exist or Password is incorrect"});

            
        })
        .then(() => {
            console.log("Promise complete.")
            //document.getElementsByName('email').innerHTML = 'Provided information did not match our records!';
        })

}
