# NodeJS-GraphQL-Auth-Starter
A starter project for user authentication with NodeJs and GraphQL using JWT.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Local Setup

A step by step series of examples that tell you how to get the development environment running

Clone the repo from github and install dependencies through npm.

```
git clone https://github.com/taiwoadepoju/NodeJS-GraphQL-Auth-Starter.git
cd NodeJS-GraphQl-Auth-Starter
npm install
npm insatall -g nodemon
npm start

```

Create a .env file in the root folder and set the following environment variables

```
JWT_PRIVATE_KEY='YOUR JWT PRIVATE KEY'
SENDGRID_API_KEY='YOUR SENDGRID API KEY'
BASE_URL='YOUR APPLICATION BASE URL'
DATABASE_URL='YOUR MONGODB URL'

```

## FEATURES

* User login
* User Sign up
* User account activation
* Forgot Password
* Change Password
* Reset Password
* User activation and verification tokens
* Disable/Enable user
* Query all users
* Sendgrid email service
* Logging

## Built With

* [Node.js](https://nodejs.org/en/) - A JavaScript runtime built on Chrome's V8 JavaScript engine.
* [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
* [GraphQL](https://graphql.org/) - A query language for your API.
* [Express-GraphQL](https://www.npmjs.com/package/express-graphql) - A module that helps create a GraphQL HTTP server with Express.

## Developer

* **Taiwo Adepoju** (adepojutaiwoandrew@gmail.com)

