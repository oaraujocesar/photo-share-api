const { ApolloServer } = require("apollo-server");

const typeDefs = `
  type Photo {
    id: ID!
    url: String!
    name: String!
    description: String
  }

  type Query {
    totalPhotos: Int!
    allPhotos: [Photo!]!
  }

  type Mutation {
    postPhoto(name: String! description: String): Photo!
  }
`;

let _id = 0;
let photos = [];

const resolvers = {
  Query: {
    totalPhotos: () => photos.length,
    allPhotos: () => photos,
  },

  Mutation: {
    postPhoto: (_, photo) => {
      let newPhoto = {
        id: _id++,
        ...photo,
      };

      photos.push(newPhoto);

      return photos[photos.length - 1];
    },
  },
  Photo: {
    url: (parent) => `http://yoursite.com/img/${parent.id}.jpg`,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen()
  .then(({ url }) => console.info(`GraphQL Service running on ${url}`));
