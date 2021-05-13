
"use strict";
const passport = require("passport");
const mongoose = require("mongoose");
const httpStatus = require("http-status-codes");
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
            DoB: body.DoB+"T12:00:00.000+00:00",
            SecurityQuestion: body.SecurityQuestion,
            Answer: body.Answer,
            Bio: body.Bio
        };
    };

module.exports = {

    getAllUsers: (req, res, next) => {
        User.find({})
            .then(users => {
                res.locals.users = users;
                next();
            })
            .catch(error => {
                console.log(`Error fetching users: ${error.message}`);
                next(error);
            });
    },

    getUserChirps: (req, res, next) => {

        let userId = mongoose.Types.ObjectId(req.params.id);
        console.log("req userChirps");
        console.log(req.user);
        console.log("resp userChirps");
        console.log(res.locals);
 
        User.aggregate([
            {
                $match: { _id: userId }
            },

            {
                $lookup: {
                    from: 'chirps',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'chirps'
                }
            },

            {
                $addFields: {
                    chirpNumber: { $size: '$chirps' },
                }
            },

        ])
            .then(user => {
                user = user[0];
                console.log(user);
                res.locals.user = user;
                res.locals.chirps = user.chirps;
                console.log("user chirps: res.locals");
                console.log(res.locals);
                next();
            })
            .catch(error => {
                console.log(`Error fetching user: ${error.message}`);
                next(error);
            });

    },

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        console.log(redirectPath);
        if (redirectPath != undefined) res.redirect(redirectPath);
        else next();
    },

    validate: (req, res, next) => {
        console.log("Validate route");

        console.log(req.body);
        //Sanitize all user input in case bad-actor bypasses form
        req
          .sanitizeBody([
            "FirstName",
            "LastName",
            "Username",
            "Gender",
            "Location",
            "Email",
            "DoB",
            "SecurityQuestion",
            "Answer"
          ])
          .trim();

        console.log(req.body);
        //Validate FirstName

        req.check("FirstName", "First name is a required field!").notEmpty();

        //Validate LastName

        req.check("LastName", "Last name is a required field!").notEmpty();

        //Validate Username

        req.check("Username", "Username is a required field!").notEmpty();
        req.check("Username", "Username is already taken").custom(value => {
          return User.findOne({Username: value}).then(user => {
            if (user) {
              return Promise.reject("Username is already taken.");
            }
          });
        });

        //Validate Gender

        req.check("Gender", "Gender is invalid").isString();

        //Validate Location

        req.check("Location", "Location is invalid").isString();

        //Validate DoB
        req.check("DoB", "Date of Birth is a required field!").notEmpty();

        req.check("DoB", "Date of Birth is invalid").isISO8601();

        req.check("DoB", "You cannot be born in the future!").custom(value => {
          //console.log("DoB: " + value);
          let today = new Date();
          //console.log("Today: " + today.toDateString());
          let dateValue = new Date(value+"T12:00:00.000+00:00");
          //console.log("dateValue" + dateValue.toDateString());
          let todayCompare = new Date(today.toDateString());
          let valueCompare = new Date(dateValue.toDateString());
          //console.log("todayCompare: " + todayCompare.valueOf());
          //console.log("valueCompare: " + valueCompare.valueOf());
          if (Number(valueCompare.valueOf()) >= Number(todayCompare.valueOf())) {
            console.log("invalid time");
            return false;
          }
          
          return true;
        });

        //Validate SecurityQuestion

        req.check("SecurityQuestion", "Security Question is a required field!").notEmpty();

        //Validate Answer

        req.check("Answer", "Answer to Security Question is a required field!").notEmpty();

        //Validate Bio

        req.check("Bio", "Bio is limited to 250 characters!").isLength({
            max: 250
        })

        //Validate Email

        req.sanitizeBody("Email").normalizeEmail({
            all_lowercase: true
        }).trim();

        req.check("Email", "Email is not valid!").isEmail();

        req.check("Email", "Email is a required field!").notEmpty();

        req.check("Email", "Email is already in use").custom(value => {
          return User.findOne({Email: value}).then(user => {
            if (user) {
              return Promise.reject("Email is already in use.");
            }
          });
        });

        //Validate Password

        req.check("Password", "Password cannot be empty!").notEmpty();

        //Validate Passwords match

        let pass2 = req.body.pass2;
        req.checkBody("Password", "Passwords must match!").equals(pass2);

        req.check("Password", 
        "Password must be 8 characters long, contain at least 1 number, capital letter, and special character")
          .isLength({min: 8})
          .matches(/\d/)
          .matches(/[A-Z]/)
          .matches(/[@$!%*#?&]/)

        req.getValidationResult().then((error) => {
            if (!error.isEmpty()) {
                let messages = error.array().map(e => e.msg);
                req.flash("error", messages.join(" and "));
                req.skip = true;
                res.locals.redirect = "/users/signup";
                next();
            }
            else {
                console.log("Validation successful");
                next();
            }

        });

    },

    validateEdit: (req, res, next) => {

      let userId = req.params.id;
      console.log(userId);

      console.log("Validating Edit...");
      console.log(req.body);
        //Sanitize all user input in case bad-actor bypasses form
        req
          .sanitizeBody([
            "FirstName",
            "LastName",
            "Username",
            "NewUsername",
            "Gender",
            "Location",
            "Email",
            "Password",
            "DoB",
            "SecurityQuestion",
            "Answer"
          ])
          .trim();

        console.log(req.body);
        //Validate FirstName

        req.check("FirstName", "First name is a required field!").notEmpty();

        //Validate LastName

        req.check("LastName", "Last name is a required field!").notEmpty();

        //Validate Username

        if (req.body.Username != req.body.NewUsername) {
        req.body.Username = req.body.NewUsername;
        req.check("NewUsername", "Username is already taken").custom(value => {
          return User.findOne({Username: value}).then(user => {
            if (user) {
              return Promise.reject("Username is already taken.");
            }
          });
        });
      }

        //Validate Gender

        req.check("Gender", "Gender is invalid").isString();

        //Validate Location

        req.check("Location", "Location is invalid").isString();

        //Validate DoB
        req.check("DoB", "Date of Birth is a required field!").notEmpty();

        req.check("DoB", "Date of Birth is invalid").isISO8601();

        req.check("DoB", "You cannot be born in the future!").custom(value => {
          //console.log("DoB: " + value);
          let today = new Date();
          //console.log("Today: " + today.toDateString());
          let dateValue = new Date(value+"T12:00:00.000+00:00");
          //console.log("dateValue" + dateValue.toDateString());
          let todayCompare = new Date(today.toDateString());
          let valueCompare = new Date(dateValue.toDateString());
          //console.log("todayCompare: " + todayCompare.valueOf());
          //console.log("valueCompare: " + valueCompare.valueOf());
          if (Number(valueCompare.valueOf()) >= Number(todayCompare.valueOf())) {
            console.log("invalid time");
            return false;
          }
          
          return true;
        });

        //Validate SecurityQuestion

        req.check("SecurityQuestion", "Security Question is a required field!").notEmpty();

        //Validate Answer

        req.check("Answer", "Answer to Security Question is a required field!").notEmpty();

        //Validate Bio

        req.check("Bio", "Bio is limited to 250 characters!").isLength({
            max: 250
        })

        //Validate Email

        req.sanitizeBody("Email").normalizeEmail({
            all_lowercase: true
        }).trim();

        req.check("Email", "Email is not valid!").isEmail();

        req.check("Email", "Email is a required field!").notEmpty();

        //Password must be changed using other route

        req.getValidationResult().then((error) => {
            if (!error.isEmpty()) {
                let messages = error.array().map(e => e.msg);
                req.flash("error", messages.join(" and "));
                req.skip = true;
                res.locals.redirect = `/users/${userId}/edit`;
                next();
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
        //console.log(req.user);
        //console.log(req.params);

        //only let loggedIn user edit their own profile//

        let currentUser = req.user._id;
        let userId = req.params.id;

        if (userId == currentUser) {

        User.findById(userId)
            .then(user => {
                res.render("users/edit", { user: user });
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                next(error);
            })
        }
        else {
          req.flash("error", "You are unauthorized to view this page");
          res.redirect(`/users/${userId}`);
        }
    },

    update: (req, res, next) => {

        if (req.skip) return next();

        console.log(req.body);

        let userId = req.params.id,
            userParams = getUserParams(req.body);

        console.log(req.body);

        User.findByIdAndUpdate(userId, { $set: userParams })
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
            if (user) {
                //console.log("Successful user");
                req.flash("success", "User account successfully created. Please sign in!");
                res.locals.redirect = "/users/signin/";
                next();
            }
            else {
                //console.log("No User");
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
            if (value == "") {
                console.log(key + " is " + value);
                error.fields.push(key);
            }
        }


        if (req.body.pass1 != req.body.pass2) {
            console.log("Passwords do not match");
            error.passmsg = "Error: Passwords do not match.";
            // res.render("signup", {error: error});
        }

        if (error.passmsg != undefined || error.fields.length > 0) {
            res.render("signup", { error: error, title: true });
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
                res.render("home", { title: true });
            })
            .catch(error => { res.send(error) })
    },

    getSignupPage: (req, res) => {
        console.log("Route to Signup page");
        res.render("users/signup", { error: false, title: true });
    },

    getSigninPage: (req, res) => {
        console.log("Route to Signin page");
        res.render("users/signin", { error: false, title: true });
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

        User.findOne({ Email: input_email, Password: input_password }).select('Email Password')
            .exec()
            .then((user) => {
                console.log("user: " + user);
                console.log("password: " + user.Password);
                console.log("email: " + user.Email);
                if (user.Password == input_password && user.Email == input_email) {
                    console.log("correct");
                    res.render("home", { title: true });
                }
            })
            .catch((error) => {
                console.log(error);
                //alert('The provided information does not match our records.');
                //res.send(error);
                res.render("signin", { error: "Error: Email doesn't exist or Password is incorrect", title: true });


            })
            .then(() => {
                console.log("Promise complete.")
                //document.getElementsByName('email').innerHTML = 'Provided information did not match our records!';
            })

    },

    respondJSON: (req, res) => {
        console.log('DONE');
        console.log(res.locals);
        res.json({
          status: httpStatus.OK,
          data: res.locals
        });
    },

    errorJSON: (error, req, res, next) => {
        let errorObject;
        if (error) {
          errorObject = {
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
          };
        } else {
          errorObject = {
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: "Unknown Error."
          };
        }
        res.json(errorObject);
    },

    follow: (req, res, next) => {
        let userId = req.params.id,
          currentUser = req.user;

          console.log("follow");
          console.log("userId: " + userId);
          console.log("currentUser: " + currentUser._id);
          
        if (currentUser) {
          User.findByIdAndUpdate(currentUser, {
            $addToSet: {
              following: userId
            }
        }, {new: true})
        .then((user) => {
            res.locals.currentUser = user;
            res.locals.success = true;
            next();
        })
        .catch(error => {
            next(error);
        });
        } else {
          next(new Error("User must log in."));
        }
    },

    newfollower: (req, res, next) => {
        let userId = req.params.id,
          currentUser = req.user;
          if (currentUser) {
            User.findByIdAndUpdate(userId, {
                $addToSet: {
                  followers: currentUser
                }
            })
            .then(() => {
                console.log("new follower successful");
                res.locals.success = true;
                console.log(res.locals.success);
                next();
            })
            .catch(error => {
                next(error);
            });
        } else {
          next(new Error("User must log in."));
        } 

    },

    unfollow: (req, res, next) => {
        let userId = req.params.id,
          currentUser = req.user;
        if (currentUser) {
          User.findByIdAndUpdate(currentUser, {
            $pull: {
              following: userId
            }
          }, {new: true})
            .then(() =>
            User.findByIdAndUpdate(userId, {
              $pull: {
                followers: currentUser._id
             }
            }, {new: true})
            )
            .then(() => {
              console.log("User unfollowed");
              res.locals.success = true;
              next();
            })
            .catch(error => {
              next(error);
            });
        } else {
          next(new Error("User must log in."));
        }
    },

    filterUserFollows: (req, res, next) => {
        let currentUser = res.locals.currentUser;
        if (currentUser) {
          let mappedFollows = res.locals.users.map(user => {
            let userFollows = currentUser.following.some(userFollow => {
              return userFollow.equals(user._id);
            });
            return Object.assign(user.toObject(), { follows: userFollows });
          });
          res.locals.courses = mappedFollows;
          next();
        } else {
          next();
        }
    },

    getNotificationPage: (req, res, error) => {
        res.render("users/following");
    },

    getFollowing: (req, res, next) => {
        let currentUser = res.locals.currentUser;
        if (currentUser) {

            User.aggregate([
                {
                  $match: {
                    _id: currentUser._id
                  }
                }, {
                  $unwind: {
                    path: '$following', 
                    preserveNullAndEmptyArrays: false
                  }
                }, {
                  $lookup: {
                    from: 'users', 
                    localField: 'following', 
                    foreignField: '_id', 
                    as: 'followingInfo'
                  }
                }, {
                  $lookup: {
                    from: 'chirps', 
                    localField: 'following', 
                    foreignField: 'user', 
                    as: 'followingChirp'
                  }
                }, {
                  $unwind: {
                    path: '$followingInfo', 
                    preserveNullAndEmptyArrays: false
                  }
                }, {
                  $unwind: {
                    path: '$followingChirp', 
                    preserveNullAndEmptyArrays: false
                  }
                }, {
                  $project: {
                    followingInfo: 1, 
                    followingChirp: 1, 
                    _id: 0
                  }
                }
              ])
              .then(notifications =>{
                  res.locals.notifications = notifications;
                  next();
              })
              .catch(error => {
                console.log(`Error fetching following notifications: ${error.message}`);
                next(error);
            });
        }
    },

    getFollowingUsers: (req,res,next) => {
        let userId = req.query.id;
        console.log(userId);
        User.aggregate([
            {
              $match: {
                _id: mongoose.Types.ObjectId(userId)
              }
            }, {
              $unwind: {
                path: '$following', 
                preserveNullAndEmptyArrays: false
              }
            }, {
              $lookup: {
                from: 'users', 
                localField: 'following', 
                foreignField: '_id', 
                as: 'following_users'
              }
            }, {
              $unwind: {
                path: '$following_users', 
                preserveNullAndEmptyArrays: false
              }
            }, {
              $project: {
                following_users: 1, 
                _id: 0
              }
            }
          ])
          .then(following_users => {
            console.log(following_users);
            res.locals.following_users = following_users;
            next();
            })
            .catch(error => {
            console.log(`Error fetching following users: ${error.message}`);
            next(error);
            });
    },

    getFollowerUsers: (req,res,next) => {
        let userId = req.query.id;
        console.log(userId);
        User.aggregate([
            {
              $match: {
                _id: mongoose.Types.ObjectId(userId)
              }
            }, {
              $unwind: {
                path: '$followers', 
                preserveNullAndEmptyArrays: false
              }
            }, {
              $lookup: {
                from: 'users', 
                localField: 'followers', 
                foreignField: '_id', 
                as: 'follower_users'
              }
            }, {
              $unwind: {
                path: '$follower_users', 
                preserveNullAndEmptyArrays: false
              }
            }, {
              $project: {
                follower_users: 1, 
                _id: 0
              }
            }
          ])
          .then(follower_users => {
            console.log(follower_users);
            res.locals.follower_users = follower_users;
            next();
            })
            .catch(error => {
            console.log(`Error fetching follower users: ${error.message}`);
            next(error);
            });
    },

    editAccount: (req, res, next) => {
      console.log("editAccount");
      let currentUser = req.user._id;
      let userId = req.params.id;

      if (userId == currentUser) {

      User.findById(userId)
          .then(user => {
              res.render("users/editAccount", { user: user });
          })
          .catch(error => {
              console.log(`Error fetching user by ID: ${error.message}`);
              next(error);
          })
      }
      else {
        req.flash("error", "You are unauthorized to view this page");
        res.redirect(`/users/${userId}`);
      }

    },

    validateUpdateAccount: (req, res, next) => {
      console.log("validateUpdateAccount");
      //console.log(req.body);
      //console.log(req.user);

      let userId = req.user._id;

      //sanitize email
      req.sanitizeBody("Email").normalizeEmail({
        all_lowercase: true
        }).trim();
    

      //sanitize passwords

      req
        .sanitizeBody([
          "Password",
          "newPassword",
          "newPasswordconfirm"
        ])
        .trim();

      //check current email
      req.check("Email", "Email is not valid!").isEmail();
      req.check("Email", "Email is a required field!").notEmpty();

      //check Password
      req.check("Password", 
        "Password must be 8 characters long, contain at least 1 number, capital letter, and special character")
          .isLength({min: 8})
          .matches(/\d/)
          .matches(/[A-Z]/)
          .matches(/[@$!%*#?&]/)

      let newpass = req.body.newPassword,
      newpass_con = req.body.newPasswordconfirm,
      oldpass = req.body.Password;

      if (newpass != "") {
        req.check("newPassword", 
        "Password must be 8 characters long, contain at least 1 number, capital letter, and special character")
          .isLength({min: 8})
          .matches(/\d/)
          .matches(/[A-Z]/)
          .matches(/[@$!%*#?&]/)

        req.checkBody("newPasswordconfirm", "Passwords must match!").equals(newpass_con);
        req.changePass = true;

      }

      let oldemail = req.body.Email,
      newemail = req.body.newEmail;

      console.log(newemail);
      if(newemail != "") {

        req.sanitizeBody("newEmail").normalizeEmail({
          all_lowercase: true
        }).trim();

        req.check("newEmail", "New Email is already taken").custom(value => {
          return User.findOne({Email: value}).then(user => {
            if (user) {
              return Promise.reject("New Email is already taken.");
            }
          });
        });

        req.check("newEmail", "New Email is not valid!").isEmail();

        req.changeEmail = true;
      }

      req.getValidationResult().then((error) => {
        if (!error.isEmpty()) {
            let messages = error.array().map(e => e.msg);
            req.flash("error", messages.join(" and "));
            req.skip = true;
            res.locals.redirect = `/users/${userId}/editAccount`;
            next();
        }
        else {
            console.log("Validation successful");
            next();
        }

    });
    },

    changePassword: (req, res, next) => {
      if (req.skip) return next();
      let userId = req.user._id;

      if(req.changePass && req.user) {
        req.user.changePassword(
          req.body.Password,
          req.body.newPassword,
          function (error) {
            if (error) {
              console.log("Error updating password");
              req.flash("error", `${error.message}`);
              req.skip=true;
              res.locals.redirect = `/users/${userId}/editAccount`;
              res.locals.user = req.user;
              next();
            }
            else {
              console.log("Password changed successfully");
              res.locals.user = req.user;
              req.flash("success", "Password successfully updated");
              next();
            }
          }
        )
      }
      else {
        console.log("Did not change Password");
        res.locals.user = req.user;
        // console.log(res.locals.user);
        next();
      }

    },
    
    updateAccount: (req, res, next) => {
      if (req.skip) return next();
      console.log("updateAccount");
      let userId = req.user._id;

      // console.log("Here is res.locals");
      // console.log(res.locals);

      if(req.changeEmail && req.user) {
        console.log("changing email...");
        User.findByIdAndUpdate(userId, {Email: req.body.newEmail}, {new: true})
          .then((user) => {
            res.locals.currentUser = user;
            res.locals.user = user;
            // console.log("res.locals after update");
            // console.log(res.locals);
            req.flash("success", "Email update successful - Please sign in");
            res.locals.redirect = `/users/signin/`;
            next();
          })
          .catch((error) => {
            req.flash("error", `${error.message}`);
            res.locals.user = req.user;
            next(error);
          })
      }

      else {
        res.locals.redirect = `/users/${userId}`;
        res.locals.user = req.user;
        // console.log(res.locals.user);
        next();
      }

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
