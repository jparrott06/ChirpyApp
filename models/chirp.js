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
            // user: { type: Schema.Types.ObjectId, ref: User },
            user: { type: String, required: true}

        },
        {
            timestamps: true
        }
    )
    chirpSchema.virtual("fullName").get(function (){
        return `${this.name.first} ${this.name.last}`;
    });
    
module.exports = mongoose.model("Chirp", chirpSchema);