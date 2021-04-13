"use strict";

module.exports = {

    showIndex: (req, res) => {
        res.render("index", {title: true});
    },

    showHome: (req, res) => {
        res.render("home", {title: true});
    },

    sendToSignup: (req, res) => {
        res.render("signup", {title: true});
    },

    sendToSignin: (req, res) => {
        res.render("signin", {title: true});
    }
    
}