"use strict";

const Chirp = require("../models/chirp"),
    getChirpParams = body => {
        return {
            chirpBody: body.chirpBody,
            user: body.user
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

    create: (req, res, next) => {
        let chirpParams = getChirpParams(req.body);
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
                res.locals.redirect = "/chirps";
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