const { gql } = require('apollo-server');

// Define Structure of User object and queries/mutations. Specify input types.
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    telephone: Int
    role: String
    description: String
  }
  
  type Query {
    users: [User]!
    user(id: ID!): User
  }
  
  type Mutation {
    newUser(username: String! email: String! telephone: Int role: String description: String): User!
    updateUser(id: ID! role: String description: String): User!
    deleteUser(id: ID!): User!
  }
  
`;

module.exports = typeDefs;
