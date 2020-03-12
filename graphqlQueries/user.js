const graphql = require('graphql');
const { GraphQLList } = graphql;
const userResolvers = require('../graphqlResolvers/user');
const UserType = require('../graphqlSchema/user');

const userQuery = {
  getAllUsers: {
    type: new GraphQLList(UserType),
    resolve() {
      return userResolvers.getAllUsers();
    }
  },

}


module.exports = userQuery;