# Submission Requirements
## Project Description:
MyNews is a webapp that allows users to browse through different news articles worldwide and save their favorite articles to their profile. I used TypeScript/Node.JS for the backend and React/TypeScript for the frontend as well as the News API for my news data source. MySQL for my database and for I leveraged Sequelize for my ORM. My app has two db tables; a User table containing of 7 columns id, firstName, lastName, email, password, createdAt, and updatedAt and a SavedArticles table containing 10 columns =>  id, articleAuthor, articleTitle, articleImg, articleDescription, articleUrl, articleContent, userId, createdAt, and updatedAt. For my db layer (crud.ts) I also used Sequelize to interact with my database. This file contains a create user function to store the user's data, a create saved articles function to store articles, a get articles by user id function to fetch all of the articles that were saved by a specific user and a get user by email function to retrieve the user's login information from the database. My routes/controller are defined in app.ts. This layer uses Express as the REST API and it has 8 endpoints.

This app uses the MVC pattern where my model consists of the MySQL DB, the controller is defined in app.js, and the view is rendered via react in the frontend. 

# Newsfeed/Homepage
On the homepage users can see the most recent news articles from a variety of sources. The data for the articles is fetched via the /news_feed endpoint. Each article is displayed inside of a custom Article component. This compontent contains relevant information about the article as well as a link to the original article, a button to save the article to the user's profile, and a button to share the article via email. The save article button will only work when the user is logged in. If the user is logged out, pressing this button will alert the user that they need to create an account, otherwise the article will be saved to the user's profile via the /save_article POST endpoint. 

When the user first lands on this page they will see the navigation bar at the top with the option to create an account which takes them to the sign up page or they can login which takes them to the login page. 

## Homepage
<img src="https://github.com/MailyRa/Onramp-Twitch-TakeHome/blob/main/screenshots/Screen%20Shot%202021-01-13%20at%2012.48.41%20AM.png?raw=true" width="80%">

## Share Article
<img src="https://github.com/MailyRa/Onramp-Twitch-TakeHome/blob/main/screenshots/Screen%20Shot%202021-01-13%20at%2012.53.06%20AM.png?raw=true" width="80%">



# Login page
On the login page there are 3 components: an email text field, a password text field, and a submit button. When the user presses the submit button, the data from both text fields are send to the server to the /handle_login endpoint. This will fetch any existing users and validate the plaintext password against the hashed password in the Users table. If a user logs in successfully they are redirected to the homepage where they are able to save articles to their profile.
<img src="https://github.com/MailyRa/Onramp-Twitch-TakeHome/blob/main/screenshots/Screen%20Shot%202021-01-13%20at%2012.48.53%20AM.png?raw=true" width="80%">



# Sign up page
On the sign up page there are 5 components: a first name text field, a last name text field, an email text field, a password text field, and a submit button. When a user presses the submit button the data is sent to the server to the /sign_up endpoint. This endpoint will first check to see if there are any existing users in the database with the same email address. If there is an existing user then an error message is returned to the client. If there is not an exisitng user, then a new user is created in the Users table. The password that is stored for the user is first hashed before saving it in the db. After successfully creating an account the user is redirected to the homepage.
<img src="https://github.com/MailyRa/Onramp-Twitch-TakeHome/blob/main/screenshots/Screen%20Shot%202021-01-13%20at%2012.50.53%20AM.png?raw=true" width="80%">



# Saved Articles page
When a user has either logged in or created an account the "Saved Articles" link appears in the nav bar at the top of the webpage. This fetches data via the /user_saved_articles endpoint. This endpoint returns all of the artcles from the SavedArticles table for the logged in user and displays the articles using the custom Article component as described above. 
<img src="https://github.com/MailyRa/Onramp-Twitch-TakeHome/blob/main/screenshots/Screen%20Shot%202021-01-13%20at%2012.52.34%20AM.png?raw=true" width="80%">



# Logout
When the user is logged into the app they also have the option to logout when their session has ended. The logout link is only displayed in the navbar when the user is logged in, otherwise users will not be presented with this option. 


### Project Requirements:
Please list examples of how your project meets the following requirements below:
- [x] Use a modern JS Library/Framework like React, Angular, etc. We suggest using React.js.

  React.js

- [x] Create an application that can be interacted with in a minimum of three different ways by the user.

  Login, Sign up, Logout, share article, save article, visit article webpage

- [x] Use of at least one Service.

  Used an Express Node.js server for the backend service

- [x] The usage of a specified architectural pattern (MVC, MVP, MVVM,  etc.)

  I used an MVC architectural pattern for this project using a MySQL db, Express, and React for the web view.

- [x] Use of a [REST API](https://medium.com/@arteko/the-best-way-to-use-rest-apis-in-swift-95e10696c980).

  I used the Express framework to build a REST API with 6 endpoints (4 POST and 2 GET)

- [x] Usage of at least 5 UI components from the [material-ui/@core](https://material-ui.com/) library (if you are not using React, a comparable UI library is acceptable)

  I used: AppBar, Toolbar, Typography, Button, and Link. I also used the Card component from the react bootstrap library. 

- [x] An example of a reusable UI component that you have created and used in the app. This should be different than the 5 UI components from the vendor library.

   I created a custom Article component in my app that is used on both the Homepage and the Saved Articles page. This component displays all of the relevant            information about a news article in a card.
