"use strict";

const mongoose = require("mongoose"),
  User = require("./models/user"),
  Chirp = require("./models/chirp");

mongoose.connect(
  "mongodb://localhost:27017/chirpy_app",
  { useUnifiedTopology: true, useNewUrlParser: true }
);
mongoose.set("useCreateIndex", true);
mongoose.connection;

var users = [
  {
    FirstName: "Chirp",
    LastName: "Boy",
    Username: "chirpboiOG619",
    Gender: "male",
    Location: "Ulaanbataar",
    Email: "chirpy1@chirp.com",
    Password: "123Chirp",
    DoB: new Date('2021-03-09T00:00:00.000+00:00'),
    SecurityQuestion: "Who is your favorite author?",
    Answer: "Yukio Mishima",
    Bio: "*chirp*",
    _id: mongoose.Types.ObjectId("6076b92e35062b14a4f2fa18"),
    following:[mongoose.Types.ObjectId("607628967f2ec10d58c09e48")],
    followers: []
  },
  {
    FirstName: "Rando",
    LastName: "Person",
    Username: "rando111",
    Gender: "female",
    Location: "Third Rome",
    Email: "rando@random.com",
    Password: "AvalidatedPassword111",
    DoB: new Date('2021-03-09T00:00:00.000+00:00'),
    SecurityQuestion: "What is your mother's maiden name?",
    Answer: "Randomovna",
    Bio: "Glory to Xi Jinping and the Glorious People's Republic of China (not a bot :^)).",
    _id: mongoose.Types.ObjectId("607628967f2ec10d58c09e48"),
    following: [],
    followers: [mongoose.Types.ObjectId("6076b92e35062b14a4f2fa18")]
  },
  {
    FirstName: "Joey",
    LastName: "John",
    Username: "joeyj686",
    Gender: "male",
    Location: "Kualalumpur",
    Email: "joeyj686@joeyjohn.com",
    Password: "Password123",
    DoB: new Date('2021-03-09T00:00:00.000+00:00'),
    SecurityQuestion: "What was your high school mascot?",
    Answer: "joey",
    Bio: "sup. I'm just a joey john boyyyyyyy.",
    _id: mongoose.Types.ObjectId("6076283a42aff7491054da25"),
    following: [],
    followers: []
  },
  {
    FirstName: "Chirp",
    LastName: "Girl",
    Username: "chirpQuennOG619",
    Gender: "female",
    Location: "Ulaanbataar",
    Email: "chirpy@chirp.com",
    Password: "123Chirp",
    DoB: new Date('2021-03-09T00:00:00.000+00:00'),
    SecurityQuestion: "Who is your favorite author?",
    Answer: "Ursula Kroeber Le Guin",
    Bio: "*chirp*",
    _id: mongoose.Types.ObjectId("6076275f886da7445cf0772c"),
    following: [],
    followers: []
  }
],
chirps = [
{
  chirpBody: "Omg I liek can't wait to chirp it upppp!!! #OMG",
  user: mongoose.Types.ObjectId("6076275f886da7445cf0772c"),
  hashtags: ["#OMG"]
},
{
  chirpBody: "Chirpy is numba 1 #chirpLyfe",
  user: mongoose.Types.ObjectId("607628967f2ec10d58c09e48"),
  hashtags: ["#chirpLyfe"]
},
{
  chirpBody: "I'm just a joey joy boiiiii #Imjoe",
  user: mongoose.Types.ObjectId("6076283a42aff7491054da25"),
  hashtags: ["#Imjoe"]
},
{
  chirpBody: "I'm all about that #chirpLyfe",
  user: mongoose.Types.ObjectId("6076b92e35062b14a4f2fa18"),
  hashtags: ["#chirpLyfe"]
}]






/// Load Users and Chirps into DB //

let createChirp = (c, resolve) => {
  Chirp.create({
    chirpBody: c.chirpBody,
    user: c.user,
    hashtags: c.hashtags
  }).then(chirp => {
    console.log(`CREATED Chirp: ${chirp.chirpBody}`);
    resolve(chirp);
  });
};

chirps.reduce(
  (promiseChain, next) => {
    return promiseChain.then(
      () =>
        new Promise(resolve => {
          createChirp(next, resolve);
        })
    );
  },
  Chirp.remove({})
    .exec()
    .then(() => {
      console.log("Chirp data is empty!");
    })
);

let registerUser = (u, resolve) => {
  User.register(
    {
      FirstName: u.FirstName,
      LastName: u.LastName,
      Username: u.Username,
      Gender: u.Gender,
      Location: u.Location,
      Email: u.Email,
      Password: u.Password,
      DoB: u.DoB,
      SecurityQuestion: u.SecurityQuestion,
      Answer: u.Answer,
      Bio: u.Bio,
      _id: u._id,
      following: u.following,
      followers: u.followers
    },
    u.Password,
    (error, user) => {
      console.log(`USER created: ${user.fullName}`);
      resolve(user);
    }
  );
};

users
  .reduce(
    (promiseChain, next) => {
      return promiseChain.then(
        () =>
          new Promise(resolve => {
            registerUser(next, resolve);
          })
      );
    },
    User.remove({})
      .exec()
      .then(() => {
        console.log("User data is empty!");
      })
  )
  .then(r => {
    console.log(JSON.stringify(r));
    mongoose.connection.close();
  })
  .catch(error => {
    console.log(`ERROR: ${error}`);
  });

// User.deleteMany()
//   .exec()
//   .then(() => {
//     console.log("User data is empty!");
//   });

// var commands = [];

// users.forEach(c => {
//   console.log(c);
//   commands.push(
//     User.create({
//         FirstName: c.FirstName,
//         LastName: c.LastName,
//         Username: c.Username,
//         Gender: c.Gender,
//         Location: c.Location,
//         Email: c.Email,
//         Password: c.Password,
//         DoB: c.DoB,
//         SecurityQuestion: c.SecurityQuestion,
//         Answer: c.Answer,
//         Bio: c.Bio
//     })
//   );
// });

// Promise.all(commands)
//   .then(r => {
//     console.log(JSON.stringify(r));
//     mongoose.connection.close();
//   })
//   .catch(error => {
//     console.log(`ERROR: ${error}`);
//   });