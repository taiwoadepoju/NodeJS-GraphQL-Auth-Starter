const express = require('express');
const error = require('../middleware/error');

const expressGraphQL = require('express-graphql');
const schema = require('../graphqlSchema');

module.exports = function(app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
  }))
  app.use(error);
}