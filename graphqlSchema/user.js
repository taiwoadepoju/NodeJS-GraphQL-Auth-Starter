const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLInt } = graphql;

const UserType = new GraphQLObjectType({
  name:  'UserType',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    gender: { type: GraphQLString },
    email: { type: GraphQLString },
    emailConfirmed: { type: GraphQLBoolean },
    phone: { type: GraphQLInt },
    isAdmin: { type: GraphQLBoolean },
    enabled: { type: GraphQLBoolean },
    createdDate: { type: GraphQLString },
    lastUpdatedDate: { type: GraphQLString },
    token: { type: GraphQLString }
  })
});

module.exports = UserType;

