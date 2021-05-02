# Final Project TODO List

## Refactor routes to follow MVC pattern [done]
- Migrate routes from main.js to /routes folder [done]
- Create xRoutes.js for each path [done]
- Link via index.js in /routes [done]
- Add Api.js route []

## Server-side Validation [ ]
- Beef-up validation using express-validator library for signup, anywhere else (users/edit ?) [ ]
    - Reject invalid chars (regex) [ ]
    - Enforce password length and required chars [ ]
    - Sanitize input data [ ]

## Error Page [ ]
- Make sure user sees error.ejs when any catastrophic error happens (e.g. 404) [ ]

## Top 10 Trending Hashtags [ ]
- Use Regex to parse Chirps for any string that starts with '#' and grab all chars after until whitespace [X]
- Create aggregation code to get top 10 [X]
- Update users/home to template top 10 hashtags [X]

## Follow/Unfollow [ ]
- Come up with schema strategy for following/followers ("followers" : array of Strings for each user) [ ]
- Create aggregation to get a user's number of followers [X]
- Create aggregation to get all the users a specific user follows [X]
- Update users/main "Who to follow" to allow users to Follow/Unfollow (also any other view relevant) [ ]
    - See API Classwork

## Notifications [ ]
- Add notifications link/routes to the Navbar [ ]
- When User clicks Notifications button then user is taken to page where they can see all tweets by all users they follow [ ]

## MVC and Best Practices [ ]
- Confirm HTML, CSS, JS all modularized and separate (to best extent possible) [ ]
- Confirm Repo follows MVC structure [ ]
- Confirm Responsivity for every page [ ]

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
