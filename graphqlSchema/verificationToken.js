const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const VerificationTokenType = new GraphQLObjectType({
  name:  'VerificationTokenType',
  fields: () => ({
    id: { type: GraphQLID },
    token: { type: GraphQLString }
  })
});

module.exports = VerificationTokenType;

