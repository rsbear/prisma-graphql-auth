const { gql } = require("apollo-server-express");

const schema = gql`
  type Query {
    users: [User!]!
  }

  type User {
    id: ID!
    email: String!
    name: String!
  }
`;

module.exports = { schema };
