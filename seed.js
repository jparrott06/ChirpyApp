"use strict";

const mongoose = require("mongoose"),
  User = require("./models/user");

mongoose.connect(
  "mongodb://localhost:27017/chirpy_app",
  { useNewUrlParser: true }
);
mongoose.set("useCreateIndex", true);
mongoose.connection;

var contacts = [
  {
    FirstName: "Chir",
    LastName: "Pee",
    Username: "chirpmasterOG619",
    Gender: "other",
    Location: "Ulaanbataar",
    Email: "chirpy@chirp.com",
    pass1: "123Chirp",
    txtDoB: 07/04/1997,
    ddSecurityQuestion: "Who is your favorite author?",
    txtAnswer: "Yukio Mishima",
    txtareaBio: "*chirp*"
  },
  {
    FirstName: "Rando",
    LastName: "Person",
    Username: "rando111",
    Gender: "female",
    Location: "Third Rome",
    Email: "rando@random.com",
    pass1: "AvalidatedPassword111",
    txtDoB: 11/11/1811,
    ddSecurityQuestion: "What is your mother's maiden name?",
    txtAnswer: "Randomovna",
    txtareaBio: "Glory to Xi Jinping and the Glorious People's Republic of China (not a bot :^))."
  },
  {
    FirstName: "Joey",
    LastName: "John",
    Username: "joeyj686",
    Gender: "male",
    Location: "Kualalumpur",
    Email: "joeyj686@joeyjohn.com",
    pass1: "Password123",
    txtDoB: 03/26/2001,
    ddSecurityQuestion: "What was your high school mascot?",
    txtAnswer: "joey",
    txtareaBio: "sup. I'm just a joey john boyyyyyyy."
  }
];

User.deleteMany()
  .exec()
  .then(() => {
    console.log("User data is empty!");
  });

var commands = [];

contacts.forEach(c => {
  commands.push(
    User.create({
        FirstName: c.FirstName,
        LastName: c.LastName,
        Username: c.Username,
        Gender: c.Gender,
        Location: c.Location,
        Email: c.Email,
        Password: c.pass1,
        DoB: c.txtDoB,
        SecurityQuestion: c.ddSecurityQuestion,
        Answer: c.txtAnswer,
        Bio: c.txtareaBio
    })
  );
});

Promise.all(commands)
  .then(r => {
    console.log(JSON.stringify(r));
    mongoose.connection.close();
  })
  .catch(error => {
    console.log(`ERROR: ${error}`);
  });