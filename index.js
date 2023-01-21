require("dotenv").config();
const express = require("express");
var cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const { PrismaClient } = require("@prisma/client");
const typeDefs = require("./schema");

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Contact = require("./resolvers/Contact");
const Investor = require("./resolvers/Investor");

const prisma = new PrismaClient();

const resolvers = {
  Query,
  Mutation,
  Contact,
  Investor,
};

const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    context: (request) => {
      return {
        ...request,
        prisma,
      };
    },
  });

  const app = express();

  await server.start();

  server.applyMiddleware({
    app,
    cors: { credentials: true, origin: true },
    path: "/",
  });

  const PORT = process.env.PORT || 4000;

  await new Promise((resolve) => app.listen({ port: PORT }, resolve));
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  return { server, app };
};

startApolloServer();
