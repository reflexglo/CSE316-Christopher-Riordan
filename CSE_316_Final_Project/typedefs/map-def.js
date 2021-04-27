const { gql } = require('apollo-server');

const typeDefs = gql `
	type Map {
		_id: String!
		id: Int!
		name: String!
		owner: String!
		regions: [Regions]
	}
	type Regions {
		_id: String!
		id: Int!
		name: String!
		capital: String
		leader: String
		landmarks:  [String]
	}
	extend type Query {
		getAllMaps: [Map]
		getMapById(_id: String!): Map 
	}
	extend type Mutation {
		addRegion(region: RegionsInput!, _id: String!, index: Int!): String
		addMap(map: MapInput!): String
		deleteRegion(regionId: String!, _id: String!): [Regions]		
		deleteMap(_id: String!): Boolean
		updateMapField(_id: String!, field: String!, value: String!): String
		updateRegionField(regionId: String!, _id: String!, field: String!, value: String!, flag: Int!): [Regions]
		sortRegions(_id: String!, filter: String!, direction: Int!): Boolean
	}
	input MapInput {
		_id: String
		id: Int
		name: String
		owner: String
		regions: [RegionsInput]
	}
	input RegionsInput {
		_id: String
		id: Int
		name: String
		capital: String
		leader: String
		landmarks:  [String]
	}
`;

module.exports = { typeDefs: typeDefs }