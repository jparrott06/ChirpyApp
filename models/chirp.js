"use strict";

const mongoose = require("mongoose"),
    { Schema } = require("mongoose"),
    User = require("./user"),
    chirpSchema = new Schema(
        {
            chirpBody: {
                type: String,
                required: true,
                minlength: 1,
                maxlength: [280, "Chirps are limited to 280 characters"]
            },
            hashtags: [{type: String}],
            user: { type: Schema.Types.ObjectId, ref: User}
        },
        {
            timestamps: true
        }
    )

chirpSchema.virtual("chirpUserInfo").get(function () {
    let userId = this.user;

    User.findById(userId)
        .then(user => {
            return `${user.fullName}@${user.Username}`;
        })
        .catch(error => {
            console.log(`Error fetching user by ID: ${error.message}`)
        })

});

module.exports = mongoose.model("Chirp", chirpSchema);