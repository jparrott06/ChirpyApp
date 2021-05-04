"use strict";

const Chirp = require("../models/chirp"),
User = require("../models/user"),
    getChirpParams = body => {
        return {
            chirpBody: body.chirpBody,
            user: body.user,
        }
    }

module.exports = {
    index: (req, res, next) => {
        Chirp.find({})
            .then(chirps => {
                res.locals.chirps = chirps;
                next();
            })
            .catch(error => {
                console.log(`Error fetching chirps: ${error.message}`);
                next(error);
            });
    },

    getAllChirps: (req, res, next) => {
        Chirp.find(function(error, chirps){

            if (error) {
                console.log(`Error retrieving chirps: $error.message`);
            }

            else{

                Chirp.aggregate([
                    {
                        $match: {}
                    },

                    {
                        $lookup:{
                            from: 'users',
                            localField: 'user',
                            foreignField: '_id',
                            as: 'userInfo'
                        }
                    },

                    {
                        $addFields: {
                            userFirstName: "$userInfo.FirstName",
                            userLastName: "$userInfo.LastName",
                            userHandle: "$userInfo.Username",
                            userGender: "$userInfo.Gender"
                        }
                    },

                    {
                        $sort: {
                            updatedAt: -1
                        }
                    }


                ])
                .then(chirps =>{
                    res.locals.chirps = chirps;
                    next();
                })
                .catch(error => {
                    console.log(`Error fetching chirps: ${error.message}`);
                    next(error);
                });

            }


        })


    },

    getHashChirpsPage: (req, res, next) => {
        res.render('chirps/hashChirps');
    },

    getHashtagChirps: (req, res, next) => {
        let hashtag = req.params.id;
        console.log(hashtag);
        Chirp.aggregate([
            {
              $match: {
                hashtags: hashtag
              }
            }, {
              $lookup: {
                from: 'users', 
                localField: 'user', 
                foreignField: '_id', 
                as: 'userInfo'
              }
            }
          ])
        .then(hashChirps =>{
            console.log(hashChirps);
            res.locals.hashChirps = hashChirps;
            next();
        })
        .catch(error => {
            console.log(`Error fetching chirps: ${error.message}`);
            next(error);
        });
    },

    indexView: (req, res) => {
        if (req.query.format === "json") {
            res.json(res.locals.chirps);
        } else {
            res.render("chirps/index", {title: false});
        }
    },
    new: (req, res) => {
        res.render("chirps/new", {title: false});
    },

    trending: (req, res, next) => {

        Chirp.aggregate([
            {
              $match: {}
            }, {
              $unwind: {
                path: '$hashtags', 
                preserveNullAndEmptyArrays: false
              }
            }, {
              $group: {
                _id: '$hashtags', 
                count: {
                  $sum: 1
                }
              }
            }, {
              $sort: {
                count: -1
              }
            }
          ])
        .then(trending =>{
            res.locals.trending = trending;
            next();
        })
        .catch(error => {
            console.log(`Error fetching trending hashtags: ${error.message}`);
            next(error);
        });

    },

    create: (req, res, next) => {
        let chirpParams = getChirpParams(req.body);

        let re = new RegExp('#{1}[a-zA-Z][a-zA-Z0-9]*', 'g');
        let parseChirp = chirpParams.chirpBody;

        chirpParams.hashtags = Array.from(parseChirp.matchAll(re), m=> m[0]);

        console.log(chirpParams.hashtags);

        Chirp.create(chirpParams)
            .then(chirp => {
                res.locals.redirect = "/users/home";
                res.locals.chirp = chirp;
                next();
            })
            .catch(error => {
                console.log(`Error saving chirp: ${error.message}`);
                next(error);
            });
    },

    show: (req, res, next) => {
        let chirpId = req.params.id;
        Chirp.findById(chirpId)
            .then(chirp => {
                res.locals.chirp = chirp;
                next();
            })
            .catch(error => {
                console.log(`Error fetching chirp by ID: ${error.message}`);
                next(error);
            });
    },

    showView: (req, res) => {
        res.render("chirps/show");
    },

    edit: (req, res, next) => {
        let chirpId = req.params.id;
        Chirp.findById(chirpId)
            .then(chirp => {
                res.render("chirps/edit", {
                    chirp: chirp
                });
            })
            .catch(error => {
                console.log(`Error fetching chirp by ID: ${error.message}`);
                next(error);
            });
    },

    update: (req, res, next) => {
        let chirpId = req.params.id,
        chirpParams = getChirpParams(req.body);

        Chirp.findByIdAndUpdate(chirpId, {
            $set: chirpParams
        })
            .then(chirp => {
                res.locals.redirect = `/chirps/${chirpId}`;
                res.locals.chirp = chirp;
                next();
            })
            .catch(error => {
                console.log(`Error updating chirp by ID: ${error.message}`);
                next(error);
            });
    },

    delete: (req, res, next) => {
        let chirpId = req.params.id;
        Chirp.findByIdAndRemove(chirpId)
            .then(() => {
                res.locals.redirect = "/users/home";
                next();
            })
            .catch(error => {
                console.log(`Error deleting chirp by ID: ${error.message}`);
                next();
            });
    },

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath !== undefined) res.redirect(redirectPath);
        else next();
    }
};