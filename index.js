const { ApolloServer } = require("apollo-server");

const typeDefs = `
  type Query {
    totalPhotos: Int!
  }
`;

const resolvers = {
  Query: {
    totalPhotos: () => 42,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen()
  .then(({ url }) => console.info(`GraphQL Service running on ${url}`));
