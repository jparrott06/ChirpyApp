# ChirpyApp
## Repo for ChirpyApp(Assignment#4) - WebAppDev2021

- website url: www.chirpyapp.herokuapp.com
- video1: https://drive.google.com/file/d/1c2VQ3hm3Qx4dSxPYLMBiWLBtJxqdusk2/view?usp=sharing

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
        │   └── chirpsController.js
        ├── models
        │   └── user.js
        │   └── chirp.js
        ├── node_modules [holds files for dependencies]
        ├── public
        │   ├── css [css for each page as well as layout.ejs]
        │   ├── images
        │   └── js [javascript scripts for our pages]
        ├── routes
        │   ├── apiRoutes.js
        │   ├── chirpRoutes.js
        │   └── errorRoutes.js
        │   └── homeRoutes.js
        │   └── index.js
        │   └── userRoutes.js
        ├── views [only displaying main pages used]
        │   ├── chirps folder [pages in relation to chirps]
            │   ├── edit.ejs [edit chirps]
            │   ├── index.ejs [shows all chirps]
            │   ├── new.ejs [new chirp]
            │   ├── show.ejs [show single chirp]
        │   ├── users folder [pages in relation to main user functions]  
            │   ├── _chirpsFeed.ejs [show all chirps]
            │   ├── _trendingFeed.ejs [show what is currently trending in hashtags]
            │   ├── _userChirps.ejs [show user chirps]
            │   ├── _userFeed.ejs [user main feed on home]
            │   ├── delete.ejs
            │   ├── edit.ejs
            │   ├── editAccount.ejs [edit profile]
            │   ├── following.ejs [who current user is following]
            │   ├── home.ejs
            │   ├── index.ejs
            │   ├── new.ejs
            │   ├── show.ejs
            │   ├── signin.ejs
            │   ├── signup.ejs
        │   ├── error.ejs [page for generic and specific errors to show user]
        │   ├── header.html [navbar - not currently used since we moved it to an ejs file]
        │   ├── index.ejs [landing page - welcomes user and routes them to either signup or signin ]
        │   ├── layout.ejs [layout for other pages: includes header, navbar, templated body for other pages, and footer]
        │   ├── right-hand-col.ejs [shows RSS feed we used prior to changing to trending now]
        │   └── table.html [contains original who to follow table]
        │   └── verify.ejs [unused]
        │── main.js [initializes app, sets ports, routes using controllers, db connection, error-handling]
        ├── package-lock.json
        ├── package.json [contains dependencies, start script, etc.]
        └── seed.js [seeds users into database, using bcrypt to hash/salts passwords before saving to database]
    ```
- ### Description of main pages:
  <details>
  <summary>home.ejs </summary>
      <b>Final Project</b> This page now contains a usable chirpy textarea, a trending sidebar with modals to see tweets with trending hashtags, a functional 'who to follow' table that allows users to follow, unfollow, and view other profiles. Our navigation bar is also more usable, with the notifications option being functional
      This is the homepage the user will see once logged into the Chirpy webapp (our version of Twitter). We also added all chirps in the chirps feed, all users in the who-to-follow, added ability to 'chirp' from home, and for currentUser to edit/delete their chirps.
      Its basic structure is as follows:
  
  <details><summary>home.html: left-sidebar</summary>
  <ul>
  <li>(Home)</li>
  <li>(Messages)</li>
  <li>(Notifications)</li>
  <li>(View Profile)</li>
  <li>(Edit Profile)</li>
  <li>(Delete Account)</li>
  <li>(Chirp)</li>
  </ul> 
  </details>

  <details><summary>home.ejs: feed</summary>
    <ul>
    <li>(Home header)</li>
    <li>(ChirpBox)</li>
    <li>(Feed which contains chirps made by all users you are following and yourself)</li>
    </ul>
  </details>

  <details><summary>home.html: right-sidebar</summary>
  <ul>
    <li>(Search box)</li>
    <li>(Trending Now Table - shows latest trending hashtags, amount of times it has been chirped, and allows you to see which tweets contain that hashtag)</li>
    <li>(Who to Follow Table - shows you users you can follow and allows you to view their profiles)</li>
  </ul>
  </details>
  </details>

  <details><summary>signup.ejs</summary>

      Signup Page for Chirpy - all requirements met as specified for Assignment#1.
      We did not add the left-navbar for signup.html because that should only be accessed by a logged in user.

      We have also implemented extensive error-handling of user input for fields before the signup form is validated.
      Changes include:
      - Passwords must match
      - Passwords must contain at least one lower-case letter, upper-case letter, a digit, a special characters, and be at least 8 characters
      - Input fields (text and email) must not contain invalid characters: &,<,>,#,`," or ~
            - First Name, Last Name, and Location also cannot include integers
      - NOTE: We decided it didn't make sense to limit char selection for input fields such as password fields and the Bio field because 1) We encourage our users to make the strongest and most secure passwords possible, 2) We will be sanitizing inputs/outputs to protect ourselves and users against common cybersecurity breaches 3) For the Bio field, we want our users to be able to express themselves with as many obnoxious '###'s as they want!(#userexperience)
      - server-side validation for this page has been added and ejs error templating added - reimplemented with express-validator
      - client-side validation for this page has been added and checks things like whether special chars/integers have been added in text fields, whether the DOB is before today, whether the user made sure to put in an answer for the security question.
  </details>

  <details><summary>signin.ejs</summary>

      Signin Page for Chirpy - all requirements met as specified for Assignment#1.
      We did not add the left-navbar for signin.html because that should only be accessed by a logged in user.
      - server-side validation for this page has been added and ejs error templating added
  </details>
  
  <details><summary>Routes Folder</summary>

      Refactored all of our routes from the main.js into their own individual js files in this folder.
      Folder contains: apiRoutes.js, chirpRoutes.js, errorRoutes.js, homeRoutes.js, index.js, userRoutes,js
      
      apiRoutes.js
      - contains all routes that are relevant to following and unfollowing both in terms of viewing and taking action as well as showing trending hashtags
      
      chirpRoutes.js
      - contains routes to make new chirp, show current chirp, show all chirps, edit existing chirp, as well as showing hashtags and chirps that contain trending hashtags

      errorRoutes.js
      - contains routes to guide user if they are on an invalid page

      homeRoutes.js
      - contains route to show homepage

      index.js
      - contains routes to show which file to use with each route file i.e. for chirpRoutes, app uses "/chirps"

       userRoutes.js
      - contains all routes that are relevant to user functions like signup, signin, access to home with all its relevant information for that user (hashtags, who to follow), logout option, editing profile, updating profile, deleting account, get following information
      We did not add the left-navbar for signin.html because that should only be accessed by a logged in user.
      - server-side validation for this page has been added and ejs error templating added
  </details>
  
    <details><summary>Views Folder - Users Folder</summary>

      While this contains many pages that were implemented for previous assignments (signin, signup, etc.), it also contains many new files that are used to grab trending hashtags and who to follow table.
      
      _trendingFeed.ejs
      - used to make trending hashtags table

      _usersFeed.ejs
      - used to make the who to follow table

      following.ejs
      - used to make notifications table, shows all chirps made by people user is following
  </details>
  
    <details><summary>Seed.js</summary>

      Contains bot users and now includes process.env so that app can be displayed on heroku.
  </details>
  
  <details><summary>index.ejs</summary>

      Index Page for Chirpy - welcomes user and routes them to either signup or signin based on what button they click
  </details>

- ### Delegation of Responsibilities:
    - Jake did server side validation, trending table, who to follow table, as well as the follow/unfollow functionality while Ayesha did client side validation, responsivity/CSS cleanup, and demo video editing. The demo video was made together.
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
  - bcrypt (for hashing and salting user passwords)(replaced)
  - express
    - express-ejs-layouts (for layouts for pages)
    - express-validator for server-side validation
    - express-session for cookie management
  - http-status-codes (library for helping send status codes)
  - method-override for PUT, DELETE
  - connect-flash for flash messages
  - passport for authentication
    - passport-local-mongoose for integration with MongoDB
  - nodemon (for easier connectivity, especially with debugging while changing code)

- ### Installation Guide:
  - To use Chirpy, you can access it at this link: http://chirpyapp.herokuapp.com/
  - If you would like to use this code and deploy, you're not allowed to! Unless you're grading us. In that case:
    - clone repo
    - host on platform such as Heroku
    - add environment variables (MONGODB_URI, PASSCODE(cookie secret string))
    - use CLI to run `node seed` if you want to clear the database and spawn the app with seeded users and chirps
    - chirp it up.

- ### Design Choices:
  - We initially tried to develop components separately for a few reasons:
    - modularity
    - best practices
    - resiliency
    - readability
    - reusability
  - However, we encountered many issues with importing/rendering (see more in section below)
  - We will still use this design choice but will do so with a more powerful library/framework like React in the future

- ### Notes and Caveats:
  - <i>The navbar was purposely left off certain pages because it should not appear for users if they are not logged in/don't have an account</i>
  
- ### Moving Forward and Lessons Learned
  - In order to develop in a modular fashion we both want to use a framework like React or Vue where we can create reusable component classes
    - this will avoid a lot of headache, make code more resilient and readable
    - rendering issues with importing our components made for a lot of time spent refactoring our codebase
  - Deciding on our Tech Stack:
    - Both developers have some experience with React, and Jacob has used the MERN stack in the past
    - While this application was built using ejs and express, we hope to continue/move it to Vue or React in the future so we can continue to practice the skills we learned in this class and get more experience with building a social media style platform.
  - Peer programming was extremely effective when trouble-shooting a single page and figuring out sizing/styling
    - we anticipate using this strategy again for larger/more complex files as we integrate this Chirpy webapp FE design into a full-stack application.

  - *Future plans*:
    - Refactor some pages to be client-side rendered (using Vue.js) to be more responsive to changes and avoid annoying page refreshes.
    - Add in features such as comments, 'likes', rechirps, sharing, image/video upload, emojis, highlighting for hashtags, etc.
    - Search functionality to find all users, chirps, hashtags partially matching the search query.
    - Replace Twitter.com and wield unlimited Power and Influence over National/International discourse on current events, worldviews, cultures, values and humanity's perception of Being itself by supplanting it with a digitized simulacrum of the Hyperreal 👁️⃤   
      - Also probably a Mobile App version. That would be cool too.

- ### <b><i><u>Extras and Goodies</u></i></b>
  - HINT: Click the Chirpy bird icon on the signup page
  - Check out the background image on signup, profile, edit profile, and new chirp pages
  - Hover over buttons to see color changes and transitions (look at search bar too and hover over search icon)
  - Check out the cool birds moving in the home header
    - Hover over Chirpy to see a flock of bird buddies join him
  - Look at the modals we've included in the 'See Chirps' portion of the trending table on the home page and 'Following/Folders' portion on profile page.
  - Hover over the comment, like, retweet, and share buttons on the home page chirps.
    - Implemented all requirements
  - New Feature: Users can now click a link on users/edit.ejs to update their account information (email/password) separately. This demarcates between edting profile information (edit.ejs) and login information (editAccount.ejs)
