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

    var error = new Object();
    error.fields = [];
    error.required = "Error: Required field cannot be blank.";
    //error.passmsg = "Error: Passwords do not match.";

    var required_field = new Map([["FirstName", req.body.FirstName], ["LastName", req.body.LastName], ["Username", req.body.Username], 
    ["Email", req.body.Email], ["pass1", req.body.pass1], ["pass2", req.body.pass2],
    ["txtDoB", req.body.txtDoB], ["ddSecurityQuestion", req.body.ddSecurityQuestion], ["txtAnswer", req.body.txtAnswer]]);

    for (const [key, value] of required_field.entries()) {
        if(value == "") {
            console.log(key + " is " + value);
            error.fields.push(key);
        }
      }

    //(1) Check that all required fields are filled

    // if(req.body.Email == "") {
    //     error.fields.push("Email");
    //     console.log(JSON.stringify(error));
    //     console.log(error.fields.includes("Email"));
    //     console.log(error.fields);
    //     res.render("signup", {error: error});
    // }


    //(2) Check that passwords match

    if(req.body.pass1 != req.body.pass2) {
        console.log("Passwords do not match");
        error.passmsg = "Error: Passwords do not match.";
            // res.render("signup", {error: error});
    }

    if(error.passmsg != undefined || error.fields.length > 0) {
        res.render("signup", {error: error});
    }

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
    res.render("signup", {error: false});
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
