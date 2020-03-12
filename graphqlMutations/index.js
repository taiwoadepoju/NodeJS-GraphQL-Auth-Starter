const graphql = require('graphql');
const { GraphQLObjectType } = graphql;
const userMutation = require('./user');
const verificationTokenMutation = require('./verificationToken');
const authMutation = require('./auth');


const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: { ...userMutation.createUser },
    editUser: { ...userMutation.editUser },
    changeUserActivationStatus: { ...userMutation.changeUserActivationStatus },
    confirmToken: { ...verificationTokenMutation.confirmToken },
    updateToken: { ...verificationTokenMutation.updateToken },
    loginUser: { ...authMutation.loginUser },
    changePassword: { ...authMutation.changePassword },
    initiateResetPassword: { ...authMutation.initiateResetPassword },
    completeResetPassword: { ...authMutation.completeResetPassword },
  }
});

module.exports = mutation;
