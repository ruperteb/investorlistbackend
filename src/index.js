const dotenv = require('dotenv')
dotenv.config() // Load the environment variables
/* const { GraphQLServer } = require('graphql-yoga') */
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { PrismaClient } = require('@prisma/client')
const typeDefs = require('./schema')

// 1


const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Contact = require('./resolvers/Contact')
const Investor = require('./resolvers/Investor')
/* const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Subscription = require('./resolvers/Subscription')
const Vote = require('./resolvers/Vote') */


/* const { PubSub } = require('graphql-yoga') */

const prisma = new PrismaClient()

/* const pubsub = new PubSub() */



// 2

const resolvers = {
    Query,
    Mutation,
    Contact,
    Investor,
    
  }

// 3

/* const opts = {
  port: 4000,
  cors: {
    credentials: true,
    origin: ["http://localhost:3000/"], 
   
  }
}; */

/* server.express.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
}); */


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
     
    }
  },
})



const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}


/* server.start(opts, () => console.log(`Server is running on http://localhost:4000`)) */

const app = express();





server.applyMiddleware({ app, cors: corsOptions,path:"/" });


 
app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);