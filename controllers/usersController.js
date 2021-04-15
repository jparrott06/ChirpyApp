"use strict";

const passport = require("passport");

const User = require("../models/user"),
getUserParams = body => {
    return {
        FirstName: body.FirstName,
        LastName: body.LastName,
        Username: body.Username,
        Password: body.Password,
        Gender: body.Gender,
        Location: body.Location,
        Email: body.Email,
        DoB: body.DoB,
        SecurityQuestion: body.SecurityQuestion,
        Answer: body.Answer,
        Bio: body.Bio
    };
};

module.exports = {

    getAllUsers: (req, res) => {
        User.find({})
            .exec()
            .then(users => {
                res.render("users", { users: users, title: true })
            })
            .catch((error) => {
                console.log(error);
                return [];
            })
            .then(() => {
                console.log("Promise complete");
            })
    },

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        console.log(redirectPath);
        if (redirectPath != undefined) res.redirect(redirectPath);
        else next();
    },

    validate: (req, res, next) => {
        console.log("Validate route");
        req.sanitizeBody("Email").normalizeEmail({
            all_lowercase: true
        }).trim();

        req.check("Email", "Email is not valid!").isEmail();

        req.check("Password", "Password cannot be empty!").notEmpty();

        req.getValidationResult().then((error) => {
            if(!error.isEmpty()) {
                let messages = error.array().map (e => e.msg);
                req.flash("error", messages.join(" and "));
                req.skip = true;
                res.locals.redirect = "/users/signup";
            }
            else {
                console.log("Validation successful");
                next();
            }

        });
    
    },

    authenticate: passport.authenticate("local", {
        failureRedirect: "/users/signin",
        failureFlash: "Login failed! Check your email or password!",
        successRedirect: "/users/home",
        successFlash: "Logged in!"
    }),

    logout: (req, res, next) => {
        req.logout();
        req.flash("success", "You have been logged out!");
        res.locals.redirect = "/";
        next();
    },

    show: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
            .then(user => {
                res.locals.user = user;
                next();
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                next(error)
            })
    },

    showView: (req, res) => {
        res.render("users/show");
    },

    edit: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
            .then(user => {
                res.render("users/edit", { user: user });
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                next(error);
            })
    },

    update: (req, res, next) => {

         if(req.skip) return next();

        let userId = req.params.id,
        userParams = getUserParams(req.body);

        User.findByIdAndUpdate(userId, {$set: userParams})
            .then(user => {
                res.locals.user = user;
                res.locals.redirect = `/users/${user._id}`;
                next();
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                next(error);
            })
    },

    deleteCheck: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
            .then(user => {
                res.render("users/delete", { user: user });
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                next(error);
            })
    },
    delete: (req, res, next) => {
        let userId = req.params.id;
        User.findByIdAndRemove(userId)
            .then(() => {
                res.locals.redirect = "/";
                next();
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                next(error);
            })
    },

    create: (req, res, next) => {
        if (req.skip) return next();
        let userParams = getUserParams(req.body);

        let newUser = new User(userParams);

        console.log(userParams);

        User.register(newUser, req.body.Password, (error, user) => {
            if(user) {
                console.log("Successful user");
                req.flash("success", "User account successfully created");
                res.locals.redirect = "/users/home/";
                next();
            }
            else {
                console.log("No User");
                req.flash("error", `Failed to create user account: ${error.message}`);
                res.locals.redirect = "/users/signup";
                next();
            }

        });
            
    },

    saveUser: (req, res) => {
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
    
    
        if(req.body.pass1 != req.body.pass2) {
            console.log("Passwords do not match");
            error.passmsg = "Error: Passwords do not match.";
                // res.render("signup", {error: error});
        }
    
        if(error.passmsg != undefined || error.fields.length > 0) {
            res.render("signup", {error: error, title: true});
        }
    
        var password = bcrypt.hashSync(req.body.pass1, salt);
    
        let newUser = new User({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Username: req.body.Username,
            Gender: req.body.Gender,
            Location: req.body.Location,
            Email: req.body.Email,
            Password: password,
            DoB: req.body.txtDoB,
            SecurityQuestion: req.body.ddSecurityQuestion,
            Answer: req.body.txtAnswer,
            Bio: req.body.txtareaBio
        });
        newUser.save()
        .then(() => {
            res.render("home", {title: true});
        })
        .catch(error => { res.send(error) })
    },

    getSignupPage: (req, res) => {
        console.log("Route to Signup page");
        res.render("users/signup", {error: false, title: true});
    },

    getSigninPage: (req, res) => {
        console.log("Route to Signin page");
        res.render("users/signin", {error: false, title: true});
    },

    getHome: (req, res) => {
        console.log("Route to Home page");
        res.render("users/home");
    },

    postSigninUser: (req, res) => {
        let input_email = req.body.Email;
        let input_password = req.body.Password;
    
        //console.log(req.body);
    
        input_password = bcrypt.hashSync(input_password, salt);
        console.log(input_password);
    
        User.findOne({Email: input_email, Password: input_password}).select('Email Password')
            .exec()
            .then((user) => {
                console.log("user: " + user);
                console.log("password: " + user.Password);
                console.log("email: " + user.Email);
                if (user.Password == input_password && user.Email == input_email) {
                    console.log("correct");
                    res.render("home", {title: true});
                }
            })
            .catch((error) => {
                console.log(error);
                //alert('The provided information does not match our records.');
                //res.send(error);
                res.render("signin", {error: "Error: Email doesn't exist or Password is incorrect", title: true});
    
                
            })
            .then(() => {
                console.log("Promise complete.")
                //document.getElementsByName('email').innerHTML = 'Provided information did not match our records!';
            })
    
    }

}


// OLD ROUTE FORMAT //

// exports.getAllUsers = (req, res) => {
//     User.find({})
//         .exec()
//         .then(users => {
//             res.render("users", { users: users, title: true })
//         })
//         .catch((error) => {
//             console.log(error);
//             return [];
//         })
//         .then(() => {
//             console.log("Promise complete");
//         })
// };

// exports.saveUser = (req, res) => {
//     console.log(req.body);

//     var error = new Object();
//     error.fields = [];
//     error.required = "Error: Required field cannot be blank.";

//     var required_field = new Map([["FirstName", req.body.FirstName], ["LastName", req.body.LastName], ["Username", req.body.Username], 
//     ["Email", req.body.Email], ["pass1", req.body.pass1], ["pass2", req.body.pass2],
//     ["txtDoB", req.body.txtDoB], ["ddSecurityQuestion", req.body.ddSecurityQuestion], ["txtAnswer", req.body.txtAnswer]]);

//     for (const [key, value] of required_field.entries()) {
//         if(value == "") {
//             console.log(key + " is " + value);
//             error.fields.push(key);
//         }
//       }


//     if(req.body.pass1 != req.body.pass2) {
//         console.log("Passwords do not match");
//         error.passmsg = "Error: Passwords do not match.";
      
//     }

//     if(error.passmsg != undefined || error.fields.length > 0) {
//         res.render("signup", {error: error, title: true});
//     }

//     var password = bcrypt.hashSync(req.body.pass1, salt);

//     let newUser = new User({
//         FirstName: req.body.FirstName,
//         LastName: req.body.LastName,
//         Username: req.body.Username,
//         Gender: req.body.Gender,
//         Location: req.body.Location,
//         Email: req.body.Email,
//         Password: password,
//         DoB: req.body.txtDoB,
//         SecurityQuestion: req.body.ddSecurityQuestion,
//         Answer: req.body.txtAnswer,
//         Bio: req.body.txtareaBio
//     });
//     newUser.save()
//     .then(() => {
//         res.render("home", {title: true});
//     })
//     .catch(error => { res.send(error) })
// }

// exports.getSignupPage = (req, res) => {
//     console.log("Route to Signup page");
//     res.render("signup", {error: false, title: true});
// }

// exports.getSigninPage = (req, res) => {
//     console.log("Route to Signin page");
//     res.render("signin", {error: false, title: true});
// }

// exports.postSigninUser = (req, res) => {
//     let input_email = req.body.email;
//     let input_password = req.body.password;

//     console.log(req.body);

//     input_password = bcrypt.hashSync(input_password, salt);
//     console.log(input_password);

//     User.findOne({Email: input_email, Password: input_password}).select('Email Password')
//         .exec()
//         .then((user) => {
//             console.log("user: " + user);
//             console.log("password: " + user.Password);
//             console.log("email: " + user.Email);
//             if (user.Password == input_password && user.Email == input_email) {
//                 console.log("correct");
//                 res.render("home", {title: true});
//             }
//         })
//         .catch((error) => {
//             console.log(error);

//             res.render("signin", {error: "Error: Email doesn't exist or Password is incorrect", title: true});

            
//         })
//         .then(() => {
//             console.log("Promise complete.")
          
//         })

// }
