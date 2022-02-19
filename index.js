const { ApolloServer } = require("apollo-server");

const typeDefs = `
  type Query {
    totalPhotos: Int!
  }

  type Mutation {
    postPhoto(name: String! description: String): Boolean!
  }
`;

let photos = [];

const resolvers = {
  Query: {
    totalPhotos: () => photos.length,
  },

  Mutation: {
    postPhoto: (_, photo) => photos.push(photo),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen()
  .then(({ url }) => console.info(`GraphQL Service running on ${url}`));
