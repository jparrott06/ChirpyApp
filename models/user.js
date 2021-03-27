const mongoose = require("mongoose"),
    userSchema = mongoose.Schema({
        FirstName: { type: String, required: true },
        LastName: { type: String, required: true },
        Username: { type: String, required: true, index: { unique: true }},
        Gender: { type: String },
        Location: { type: String },
        Email: { type: String, required: true, index: {unique: true} },
        Password: { type: String, required: true },
        DoB: { type: Date, required: true },
        SecurityQuestion: { type: String, required: true},
        Answer: { type: String, required: true},
        Bio: { type: String, maxlength: 250}
    });

module.exports = mongoose.model("User", userSchema);