const { gql } = require('apollo-server');

const typeDefs = gql `
	type User {
		_id: String
		fullName: String
		email: String
		password: String
	}
	extend type Query {
		getCurrentUser: User
		testQuery: String
	}
	extend type Mutation {
		login(email: String!, password: String!): User
		register(email: String!, password: String!, fullName: String!): User
		updateLogin(email: String!, password: String!, fullName: String!, _id: String!): User
		logout: Boolean!
	}
`;

module.exports = { typeDefs: typeDefs }