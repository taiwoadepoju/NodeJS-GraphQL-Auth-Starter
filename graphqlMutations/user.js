const graphql = require('graphql');
const { GraphQLString, GraphQLBoolean } = graphql;
const UserType = require('../graphqlSchema/user');
const userResolver = require('../graphqlResolvers/user');

const userMutation = {
  createUser: {
    type: UserType,
    args: {
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      gender: { type: GraphQLString },
      email: { type: GraphQLString },
      phone: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    resolve(parentValue, args, context) {
      return userResolver.createUser(args, context);
    }
  },
  editUser: {
    type: UserType,
    args: {
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      gender: { type: GraphQLString },
      phone: { type: GraphQLString },
    },
    resolve(parentValue, args, context) {
      return userResolver.editUser(args, context);
    }
  },
  changeUserActivationStatus: {
    type: UserType,
    args: {
      enabled: { type: GraphQLBoolean },
    },
    resolve(parentValue, args, context) {
      return userResolver.changeUserActivationStatus(args, context);
    }
  },

}


module.exports = userMutation;
