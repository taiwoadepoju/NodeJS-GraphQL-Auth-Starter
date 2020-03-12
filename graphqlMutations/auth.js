const graphql = require('graphql');
const { GraphQLString } = graphql;
const UserType = require('../graphqlSchema/user');
const authResolver = require('../graphqlResolvers/auth');
const authentication = require('../middleware/authentication');

const loginMutation = {
    loginUser: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, args, context) {
        return authResolver.login(args, context);
      }
    },
    changePassword: {
      type: UserType,
      args: {
        currentPassword: { type: GraphQLString },
        newPassword: { type: GraphQLString }
      },
      resolve(parentValue, args, context) {
        authentication(context);
        return authResolver.changePassword(args, context);
      }
    },
    initiateResetPassword: {
      type: UserType,
      args: {
        email: { type: GraphQLString }
      },
      resolve(parentValue, args, context) {
        return authResolver.initiateResetPassword(args, context);
      }
    },
    completeResetPassword: {
      type: UserType,
      args: {
        currentPassword: { type: GraphQLString },
        newPassword: { type: GraphQLString }
      },
      resolve(parentValue, args, context) {
        return authResolver.completeResetPassword(args, context);
      }
    }

  }


module.exports = loginMutation;
