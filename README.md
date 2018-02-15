# Mid-term myButler Project

myButler is a Smart TODO List.
It is a smart, auto-categorizing todo list app. The user simply has to add the name of the todo item, and it gets put into the correct list.
Drilling down on these lists will also fire off APIs of further information about the categorized todo item.

Users are able to change a category of an item in case it was mis-categorized or could not be categorized at all.

A mid-term project which worked on the following skills:
-- ES6 for server-side (Node) code
-- ES5 for front-end code
-- Node
-- Express
-- RESTful routes
-- AJAX
-- Bootstrap 3
-- jQuery
-- SASS for styling
-- PostgreSQL for DB
-- Knex.js for querying and migrations
-- git for version control


## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Fork this repository, then clone your fork of this repository.
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
6. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
-    "aws-lib": "^0.3.0",
-    "bcrypt": "^1.0.3",
-    "body-parser": "^1.15.2",
-    "bootstrap": "^4.0.0",
-    "cookie-session": "^2.0.0-beta.3",
-    "dotenv": "^2.0.0",
-    "ejs": "^2.4.1",
-    "express": "^4.13.4",
-    "jquery": "^3.3.1",
-    "knex": "^0.14.3",
-    "knex-logger": "^0.1.0",
-    "method-override": "^2.3.10",
-    "morgan": "^1.7.0",
-    "node-sass-middleware": "^0.9.8",
-    "pg": "^6.0.2",
-    "popper": "^1.0.1",
-    "popper.js": "^1.12.9",
-    "swiper": "^4.1.0"
