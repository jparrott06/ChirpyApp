# Assignment1-AkhtarParrott
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
        Assignment1-AkhtarParrott
        ├── css
        │   ├── images/.. [images used for webpages]
        │   └── /[.css files for each html file]
        ├── jss
        │   └── /[.js files for each html file]
        │   
        ├── favicon.ico [Chirpy icon for page headers]
        ├── googleBooks.html [Google Books Search API - Assignment2]
        │── header.html [left-sidebar for homepage]
        ├── home.html [homepage for Chirpy webapp with feed in middle]
        ├── right-hand-col.html [right-sidebar for homepage]
        ├── signin.html [signin page for Chirpy]
        ├── signup.html [signup page for Chirpy]
        ├── table.html ['who to follow' component]
        └── verify.html [asks user to verify account after signup]
    ```
- ### Description of main pages:
  <details>
  <summary>home.html </summary>

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

  <details><summary>home.html: feed</summary>
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

  <details><summary>signup.html</summary>

      Signup Page for Chirpy - all requirements met as specified for Assignment#1.
      We did not add the left-navbar for signup.html because that should only be accessed by a logged in user.

      We have also implemented extensive error-handling of user input for fields before the signup form is validated.
      Changes include:
      - Passwords must match
      - Passwords must contain at least one lower-case letter, upper-case letter, and digit
      - Input fields (text and email) must not contain invalid characters: &,<,>,#,`," or ~
      - NOTE: We decided it didn't make sense to limit char selection for input fields such as password fields and the Bio field because 1) We encourage our users to make the strongest and most secure passwords possible, 2) We will be sanitizing inputs/outputs to protect ourselves and users against common cybersecurity breaches 3) For the Bio field, we want our users to be able to express themselves with as many obnoxious '###'s as they want!(#userexperience)
  </details>

  <details><summary>signin.html</summary>

      Signin Page for Chirpy - all requirements met as specified for Assignment#1.
      We did not add the left-navbar for signin.html because that should only be accessed by a logged in user.
  </details>

  <details><summary>verify.html</summary>

      Verify Page for Chirpy - user must verify account after signup with 5-digit code
  </details>

- ### Delegation of Responsibilities:
  - signup.html was created by Jacob along with styling
    - Ayesha was responsible for the validate form scripts and additional styling/features of error messages and sign-up options
  - signin.html was created by Ayesha along with styling
  - left sidebar was created and styled by Ayesha
  - feed was created and styled by Jacob
  - right sidebar was created and styled by Ayesha
  - Jacob and Ayesha also collaborated extensively on the home.html:
    - Pair programming to make sure style and sizing was consistent
    - Integrated our components together and in home.html and debugged
    - Brainstorming and adding/removing features
  - googleBooks.html was created by Jacob as well as the Vue.js features
    - Ayesha helped implement the .css for this page

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
  - Vue.js

- ### Installation Guide:
  - Since these are static webpages there is no extensive installation required
    - The pages can be seen via our github pages link: https://jparrott06.github.io/Assignment1-AkhtarParrott
  - As long as you have the code, have support for js, css and html via Visual Studio or similar, you will be able to run the code

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
  - certain "inline" styling was necessary for proper rendering
    - this occured with signup background image
    - the html-checker did not like this but css pathing to image does not display for some reason
  - at first we tried to develop components in a modular fashion as to make code easier to read and follow best practices but had <i>horrible</i> issues with the components not loading/rendering.
    - these files include table, right-hand-col, header:
      - these are not standalone webpages and are considered components - some are not used.
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

- ### <b><i><u>Extras and Goodies</u></i></b>
  - HINT: Click the Chirpy bird icon on the signup.html page
  - Check out the background image on signup.html
  - Hover over buttons to see color changes and transitions
  - Click on the Searchbox on home.html
  - More to come when we go from static to dynamic scripts!
  - googleBooks.html
    - Try out our 'Buy on Amazon' button to search Amazon to buy a book you found!
    - See our Average Review <i>Gold Stars</i> for each eligible book
  - signup.html
    - Now sign-up for Chirpy using your existing Facebook, Instagram, or Gmail account!