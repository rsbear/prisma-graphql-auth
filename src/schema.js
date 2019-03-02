const { gql } = require("apollo-server-express");

const schema = gql`
  type Query {
    me: User
    users: [User!]!
  }

  type Mutation {
    signup(email: String!, name: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type User {
    id: ID!
    email: String!
    name: String!
  }
`;

module.exports = { schema };
