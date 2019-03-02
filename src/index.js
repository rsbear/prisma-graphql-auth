const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { resolvers } = require("./resolvers/resolvers");
const { prisma } = require("./generated/prisma-client");
const { schema } = require("./schema");

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  // middlewares: [permissions],
  context: request => {
    return {
      ...request,
      prisma
    };
  }
});

const PORT = 4001;

const app = express();

server.applyMiddleware({ app });
app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4001${server.graphqlPath}`)
);
