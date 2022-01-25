# Final Project TODO List

## Refactor routes to follow MVC pattern [X]
- Migrate routes from main.js to /routes folder [X]
- Create xRoutes.js for each path [X]
- Link via index.js in /routes [X]
- Add Api.js route [X]]

## Server-side Validation [ ]
- Beef-up validation using express-validator library for signup, anywhere else (users/edit ?) [x* except for editing gender]
    - Reject invalid chars (regex) [x]
    - Enforce password length and required chars [x]
    - Sanitize input data [x]

## BugFixes [ ]
- Fix Responsivity on home re: top hashtags [x]
    -also removed edit/delete option from chirp on home page on galaxy fold view
- Fix users/edit [x* except for editing gender]
- Fix responsivity for chirps/:id/edit [x]
    - also make it so when user edits chirp the hashtags are updated appropriately [X]
- Add back in and test client-side validation [x]

## Error Page [ ]
- Make sure user sees error.ejs when any catastrophic error happens (e.g. 404) [x]
- Make error page presentable [x]

## Top 10 Trending Hashtags [X]
- Use Regex to parse Chirps for any string that starts with '#' and grab all chars after until whitespace [X]
- Create aggregation code to get top 10 [X]
- Update users/home to template top 10 hashtags [X]
- Limit to 10 and pretty up CSS [X]]

## Follow/Unfollow [X]
- Come up with schema strategy for following/followers ("followers" : array of Strings for each user) [X]
- Create aggregation to get a user's number of followers [X]
- Create aggregation to get all the users a specific user follows [X]
- Update users/main "Who to follow" to allow users to Follow/Unfollow (also any other view relevant) [X]
    - See API Classwork
- Add Follow/Unfollow button to users/:id page as well. [X]

## Notifications [X]
- Add notifications link/routes to the Navbar [X]
- When User clicks Notifications button then user is taken to page where they can see all tweets by all users they follow [X]

## MVC and Best Practices [ ]
- Confirm HTML, CSS, JS all modularized and separate (to best extent possible) [x]
- Confirm Repo follows MVC structure [ ]
- Confirm Responsivity for every page [x]
    -home [x]
    -edit chirp [x]
    -user profile [x]
    -notifications page [x]
    -edit user [x]
    -delete user account [x]
    -new chirp [x]
    -chirp index [x]
    -show single chirp [x]
       
    
## Hosting [ ]
- Host app on Heroku [ ]
    - Store 'secret_key' etc. as process.env [ ]
- Host MongoDB on cloud and link all CRUD via link [ ]

## Documentation [ ]
- Update/Redo README [ ]
- Write report with detailed installation and run instructions [ ]
- Catalog any special features to get that EXTRACREDIT [ ]

## 20 min Video [ ]
- Create 20 minute video showing off app and features [ ]
