const dotenv = require('dotenv')
dotenv.config() // Load the environment variables
const { GraphQLServer } = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')

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


const { PubSub } = require('graphql-yoga')

const prisma = new PrismaClient()

const pubsub = new PubSub()



// 2

const resolvers = {
    Query,
    Mutation,
    Contact,
    Investor,
    
  }

// 3


const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
      pubsub
    }
  },
})
server.start(() => console.log(`Server is running on http://localhost:4000`))