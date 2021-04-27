import { gql } from "@apollo/client";

export const LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			email 
			_id
			fullName
			password
		}
	}
`;

export const REGISTER = gql`
	mutation Register($email: String!, $password: String!, $fullName: String!) {
		register(email: $email, password: $password, fullName: $fullName) {
			email
			password
			fullName
		}
	}
`;

export const UPDATE_LOGIN = gql`
    mutation UpdateLogin($email: String!, $password: String!, $fullName: String!) {
        updateLogin(email: $email, password: $password, fullName: $fullName) {
            email
			password
			fullName
        }
    }
`;

export const LOGOUT = gql`
	mutation Logout {
		logout 
	}
`;

export const ADD_MAP = gql`
	mutation AddMap($map: MapInput!) {
		addMap(map: $map) 
	}
`;

export const DELETE_MAP = gql`
	mutation DeleteMap($_id: String!) {
		deleteMap(_id: $_id)
	}
`;

export const UPDATE_MAP_FIELD = gql`
	mutation UpdateMapField($_id: String!, $field: String!, $value: String!) {
		updateMapField(_id: $_id, field: $field, value: $value)
	}
`;

export const ADD_REGION = gql`
	mutation AddRegion($region: RegionsInput!, $_id: String!, $index: Int!) {
		addRegion(region: $region, _id: $_id, index: $index)
	}
`;

export const DELETE_REGION = gql`
	mutation DeleteRegion($regionId: String!, $_id: String!) {
		deleteRegion(regionId: $regionId, _id: $_id) {
			_id
			id
			name
			capital
			leader
			landmarks
		}
	}
`;

export const UPDATE_REGION_FIELD = gql`
	mutation UpdateRegionField($_id: String!, $regionId: String!, $field: String!, $value: String!, $flag: Int!) {
		updateRegionField(_id: $_id, regionId: $regionId, field: $field, value: $value, flag: $flag) {
			_id
			id
			name
			capital
			leader
			landmarks
		}
	}
`;

export const SORT_REGIONS = gql`
mutation SortRegions($_id: String!, $filter: String!, $direction: Int!) {
	sortRegions(_id: $_id, filter: $filter, direction: $direction)
}
`;