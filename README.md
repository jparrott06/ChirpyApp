# ChirpyApp
## Repo for ChirpyApp(Assignment#3) - WebAppDev2021

- ### Table of Contents
  - [File Structure](./README.md#file-structure)
  - [Description of Main Pages](./README.md#description-of-main-pages)
  - [Delegation of Responsibilities](./README.md#delegation-of-responsibilities)
  - [Project Vision](./README.md#project-vision)
  - [Technologies Used](./README.md#technologies-used)
  - [Installation Guide](./README.md#installation-guide)
  - [Design Choices](./README.md#design-choices)
  - [Notes and Caveats](./README.md#notes-and-caveats)
  - [Moving Forward and Lessons Learned](./README.md#moving-forward-and-lessons-learned)
  - [Extras and Goodies](./README.md#extras-and-goodies)


- ### File Structure:
    ```
        ChirpyApp
        ├── controllers
        │   ├── errorController.js
        │   ├── homeController.js
        │   └── usersController.js
        ├── models
        │   └── user.js
        ├── node_modules [holds files for dependencies]
        ├── public
        │   ├── css [css for each page as well as layout.ejs]
        │   ├── images
        │   └── js [javascript scripts for our pages]
        ├── views [only displaying main pages used]
        │   ├── error.ejs [page for generic and specific errors to show user]
        │   ├── home.ejs [homepage, updated from html to templated ejs]
        │   ├── index.ejs [landing page - welcomes user and routes them to either signup or signin ]
        │   ├── layout.ejs [layout for other pages: includes header, navbar, templated body for other pages, and footer]
        │   ├── signin.ejs [signin page, updated to ejs: templated for sending server-side validation errors]
        │   └── signup.ejs [signup page, updated to ejs: templated for sending server-side validation errors]
        │── main.js [initializes app, sets ports, routes using controllers, db connection, error-handling]
        ├── package-lock.json
        ├── package.json [contains dependencies, start script, etc.]
        └── seed.js [seeds users into database, using bcrypt to hash/salts passwords before saving to database]
    ```
- ### Description of main pages:
  <details>
  <summary>home.ejs </summary>
      <b>ASSIGNMENT 3</b> This page was kept basically the same except for making it compatible with ejs and layout.
      This is the homepage the user will see once logged into the Chirpy webapp (our version of Twitter).
      Its basic structure is as follows:
  
  <details><summary>home.html: left-sidebar</summary>
  <ul>
  <li>(Home)</li>
  <li>(#Explore)</li>
  <li>(Notifications)</li>
  <li>(Messages)</li>
  <li>(Bookmarks)</li>
  <li>(Profile)</li>
  <li>(Settings)</li>
  <li>(Chirp)</li>
  </ul> 
  </details>

  <details><summary>home.ejs: feed</summary>
    <ul>
    <li>(Home header)</li>
    <li>(ChirpBox)</li>
    <li>(Feed which contains mockdata of Chirpy posts)</li>
    </ul>
  </details>

  <details><summary>home.html: right-sidebar</summary>
  <ul>
    <li>(Search box)</li>
    <li>(News)</li>
    <li>(Who to Follow/Trending)</li>
  </ul>
  </details>
  </details>

  <details><summary>signup.ejs</summary>

      Signup Page for Chirpy - all requirements met as specified for Assignment#1.
      We did not add the left-navbar for signup.html because that should only be accessed by a logged in user.

      We have also implemented extensive error-handling of user input for fields before the signup form is validated.
      Changes include:
      - Passwords must match
      - Passwords must contain at least one lower-case letter, upper-case letter, and digit
      - Input fields (text and email) must not contain invalid characters: &,<,>,#,`," or ~
      - NOTE: We decided it didn't make sense to limit char selection for input fields such as password fields and the Bio field because 1) We encourage our users to make the strongest and most secure passwords possible, 2) We will be sanitizing inputs/outputs to protect ourselves and users against common cybersecurity breaches 3) For the Bio field, we want our users to be able to express themselves with as many obnoxious '###'s as they want!(#userexperience)
      - server-side validation for this page has been added and ejs error templating added
  </details>

  <details><summary>signin.ejs</summary>

      Signin Page for Chirpy - all requirements met as specified for Assignment#1.
      We did not add the left-navbar for signin.html because that should only be accessed by a logged in user.
      - server-side validation for this page has been added and ejs error templating added
  </details>

  <details><summary>index.ejs</summary>

      Index Page for Chirpy - welcomes user and routes them to either signup or signin based on what button they click
  </details>

- ### Delegation of Responsibilities:
  - <b>ASSIGNMENT 3:</b> See Report in repo for updated info regarding this topic

- ### Project Vision:
  - We are developing a social media web application modeled on Twitter, called <b><i>Chirpy!</i></b>
  - Inspiration for features, aesthetics, and design choices are heavily influenced by Twitter and especially the Dark Mode version of the application

- ### Technologies used:
  - CSS
    - Bootstrap library
    - font-awesome (for icons)
  - Javascript
    - jquery
  - HTML
  - Vue.js (will be using in future)
  - ejs (for templating pages with js logic re: views and server-side errors with validation)
  - mongodb (to host our user collection and be our database)
  - mongoose (library for connectivity to local mongodb db)
  - bcrypt (for hashing and salting user passwords)
  - express
    - express-ejs-layouts (for layouts for pages)
  - http-status-codes (library for helping send status codes)
  - nodemon (for easier connectivity, especially with debugging while changing code)

- ### Installation Guide:
  - <b>ASSIGNMENT 3:</b> See Report in repo for updated, thorough 'Installation Guide'

- ### Design Choices:
  - We initially tried to develop components separately for a few reasons:
    - modularity
    - best practices
    - resiliency
    - readability
    - reusability
  - However, we encountered many issues with importing/rendering (see more in section below)
  - We will still use this design choice but will do so with a more powerful library/framework like React in the future
  - <b>ASSIGNMENT 3:</b> See Report in repo for updated info regarding this topic

- ### Notes and Caveats:
  - <i>The navbar was purposely left off certain pages because it should not appear for users if they are not logged in/don't have an account</i>
  - <b>ASSIGNMENT 3:</b>: 
    - For this assignment we wanted to meet requirements and show off our knowledge of being able to template our navbar in layout.ejs and meet Requirements for the assignment (we display it on index, signup, home but left it off signin). In the next iteration of this app, we will not have it on index and signup - only home and its views. We will use partials/different layouts next iteration as we will be working with home a lot more.
    - Testing Tips: (1): An easy way to test our server-side validation is to remove/comment out the front-end validation function being called and adding 'novalidate' to the form. (2): We hash and salt our passwords so if you want to try using a user populated from seed.js then just view the password before it was salted. <b>In the future, we will be hiding the salt but for your testing this locally I made it a visible const on pages it was required (seed.js, usersController.js).</b>
  
- ### Moving Forward and Lessons Learned
  - In order to develop in a modular fashion we both want to use a framework like React or Vue where we can create reusable component classes
    - this will avoid a lot of headache, make code more resilient and readable
    - rendering issues with importing our components made for a lot of time spent refactoring our codebase
  - Deciding on our Tech Stack:
    - Both developers have some experience with React, and Jacob has used the MERN stack in the past
    - We will reach a decision within the next week or two to decide on a stack, taking into account pros/cons of different technologies and our requirements
    - This will also help us from a design and organizational perspective once we know the BackEnd techologies we will be utilizing
  - Peer programming was extremely effective when trouble-shooting a single page and figuring out sizing/styling
    - we anticipate using this strategy again for larger/more complex files as we integrate this Chirpy webapp FE design into a full-stack application.
  - I met with the TA and he made a great point about certain css libraries/frameworks overwriting and competing with one another
    - This can be a good heuristic to use for solving difficult or odd issues with styling especially
  - <b>ASSIGNMENT 3:</b> See Report in repo for updated info regarding this topic

- ### <b><i><u>Extras and Goodies</u></i></b>
  - HINT: Click the Chirpy bird icon on the signup.html page
  - Check out the background image on signup.html
  - Hover over buttons to see color changes and transitions
  - Click on the Searchbox on home.html
  - <b>ASSIGNMENT 3:</b> See Report in repo for updated info regarding this topic
    - Implemented all requirements
    - Used bcrypt to hash and salt passwords