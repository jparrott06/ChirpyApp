"use strict";

const mongoose = require("mongoose"),
  User = require("./models/user"),
  bcrypt = require("bcryptjs"), 
  salt = "$2a$10$fJLc.hoTJHrvqlK/mAaeHu";

mongoose.connect(
  "mongodb://localhost:27017/chirpy_app",
  { useUnifiedTopology: true, useNewUrlParser: true }
);
mongoose.set("useCreateIndex", true);
mongoose.connection;

var contacts = [
  {
    FirstName: "Chir",
    LastName: "Pee",
    Username: "chirpmasterOG6191",
    Gender: "male",
    Location: "Ulaanbataar",
    Email: "chirpy1@chirp.com",
    pass1: "123Chirp",
    txtDoB: new Date('2021-03-09T00:00:00.000+00:00'),
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
    txtDoB: new Date('2021-03-09T00:00:00.000+00:00'),
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
    txtDoB: new Date('2021-03-09T00:00:00.000+00:00'),
    ddSecurityQuestion: "What was your high school mascot?",
    txtAnswer: "joey",
    txtareaBio: "sup. I'm just a joey john boyyyyyyy."
  },
  {
    FirstName: "Chir",
    LastName: "Pee",
    Username: "chirpmasterOG619",
    Gender: "male",
    Location: "Ulaanbataar",
    Email: "chirpy@chirp.com",
    pass1: "123Chirp",
    txtDoB: new Date('2021-03-09T00:00:00.000+00:00'),
    ddSecurityQuestion: "Who is your favorite author?",
    txtAnswer: "Yukio Mishima",
    txtareaBio: "*chirp*"
  }
];

User.deleteMany()
  .exec()
  .then(() => {
    console.log("User data is empty!");
  });

var commands = [];

contacts.forEach(c => {
  console.log(c);
  const hash = bcrypt.hashSync(c.pass1, salt);
  commands.push(
    User.create({
        FirstName: c.FirstName,
        LastName: c.LastName,
        Username: c.Username,
        Gender: c.Gender,
        Location: c.Location,
        Email: c.Email,
        Password: hash,
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