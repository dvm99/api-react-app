const {ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');

// Initial API dataset
let users = [
    {
        id: '0',
        username: 'Diego V.M.',
        email: 'diego@email.nl',
        telephone: '+123123123',
        role: 'Admin',
        description: 'This person is admin',
    },
    {
        id: '1',
        username: 'Test User',
        email: 'test@user.com',
        telephone: '+555000555',
        role: 'Mod',
        description: 'This was fetched from the GraphQL API',
    }
]

const resolvers = {
    Query: {
        // Get all users
        users: () => users,
        // Get user by id
        user: (parent, args) => {
            return users.find(user => user.id === args.id);
        }
    },
    Mutation: {
        // Create new user mutation
        newUser: (parent, args) => {
            const user = {
                id: String(users.length + 1),
                username: args.username || '',
                email: args.email || '',
                telephone: args.telephone || 0,
                role: args.role || '',
                description: args.role || '',
            };
            users.push(user);
            return user;
        },
        // Update user  mutation
        updateUser: (parent, args) => {
            const index = users.findIndex(user => user.id === args.id);
            const user = {
                id: args.id,
                username: users[index].username,
                email: users[index].email,
                telephone: users[index].telephone,
                role: args.role,
                description: args.description,
            };
            users[index] = user;
            return user;
        },
        // Delete user mutation
        deleteUser: (parent, args) => {
            const deletedUser = users.find(
                user => user.id === args.id
            );
            users = users.filter(user => user.id !== args.id);
            return deletedUser;
        }
    }

};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`📚 GraphQL API server ready at ${url}`);
});

