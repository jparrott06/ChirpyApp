"use strict";
//const passportLocalMongoose = require("passport-local-mongoose");

const mongoose = require("mongoose"),
    { Schema } = require("mongoose"),
    userSchema = new Schema(
        {
            FirstName: { type: String, required: true },
            LastName: { type: String, required: true },
            Username: { type: String, required: true, index: { unique: true } },
            Gender: { type: String },
            Location: { type: String },
            Email: { type: String, required: true, index: { unique: true } },
            Password: { type: String, required: true },
            DoB: { type: Date, required: true },
            SecurityQuestion: { type: String, required: true },
            Answer: { type: String, required: true },
            Bio: { type: String, maxlength: 250 }
        },
        {
            timestamps: true
        }

    )

userSchema.virtual("fullName").get(function () {
    return `${this.FirstName} ${this.LastName}`;
});

// userSchema.plugin(passportLocalMongoose, {
//     usernameField: "Email"
// });

module.exports = mongoose.model("User", userSchema);