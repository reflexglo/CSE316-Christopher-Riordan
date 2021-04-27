import React, { useState, useEffect } 	from 'react';
import NavbarOptions 					from '../navbar/Navbar';
import Login 							from '../modals/Login';
import Delete 							from '../modals/Delete';
import CreateAccount 					from '../modals/CreateAccount';
import UpdateAccount 					from '../modals/UpdateAccount';
import MainContents						from '../main/MainContents';
import { GET_DB_MAPS } 					from '../../cache/queries';
import * as mutations 					from '../../cache/mutations';
import { useMutation, useQuery } 		from '@apollo/client';
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide } from 'wt-frontend';



const Homescreen = (props) => {
	let maps 								= [];
	const [activeMap, setActiveMap] 		= useState(undefined);
	const [selectedMap, setSelectedMap]		= useState(undefined);
	const [selectedRegion, setSelectedRegion]	= useState(undefined);
	const [deletedMap, setDeletedMap]			= useState("");
    const [showDelete, toggleShowDelete] 	= useState(false);
	const [showLogin, toggleShowLogin] 		= useState(false);
	const [showCreate, toggleShowCreate] 	= useState(false);
	const [showUpdate, toggleShowUpdate] 	= useState(false);

	const [AddMap] 			= useMutation(mutations.ADD_MAP);
	const [DeleteMap]		= useMutation(mutations.DELETE_MAP);
	const [UpdateMapField] 	= useMutation(mutations.UPDATE_MAP_FIELD);

	const { loading, error, data, refetch } = useQuery(GET_DB_MAPS);
	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) { maps = data.getAllMaps; }

    const auth = props.user === null ? false : true;

	const refetchMaps = async () => {
		const { loading, error, data } = await refetch();
		if (data) {
			maps = data.getAllMaps;
			if(activeMap){
				setActiveMap(activeMap);
			}
		}
	}

	const createNewMap = async () => {
		const length = maps.length
		const id = length >= 1 ? maps[length - 1].id + Math.floor((Math.random() * 100) + 1) : 1;
		let thisMap = {
			_id: '',
			id: id,
			name: 'Untitled',
			owner: props.user._id,
			regions: [],
		}
		const { data } = await AddMap({ variables: { map: thisMap }, refetchQueries: [{ query: GET_DB_MAPS }] });
	};

	const deleteMap = async (_id) => {
		if(activeMap._id == _id){
			setActiveMap(undefined);
		}
		DeleteMap({ variables: { _id: _id }, refetchQueries: [{ query: GET_DB_MAPS }] });
		refetch();
	};

	const updateMapField = async (_id, field, value, prev) => {
		const { data } = await UpdateMapField({ variables: { _id: _id, field: field, value: value }});
		refetch();
	};

    const setShowLogin = () => {
		toggleShowDelete(false);
		toggleShowCreate(false);
		toggleShowLogin(!showLogin);
		toggleShowUpdate(false);
	};

	const setShowCreate = () => {
		toggleShowDelete(false);
		toggleShowLogin(false);
		toggleShowCreate(!showCreate);
		toggleShowUpdate(false);
	};

	const setShowUpdate = () => {
		toggleShowDelete(false);
		toggleShowLogin(false);
		toggleShowCreate(false);
		toggleShowUpdate(!showUpdate);
	};

    const setShowDelete = (isDelete,map_id) => {
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleShowDelete(isDelete);
		toggleShowUpdate(false);
		setDeletedMap(map_id);
	}
	const enterMap = () => {
		setSelectedMap(activeMap);
	}

	const goHome = () => {
		setSelectedMap(undefined);
		setSelectedRegion(undefined);
	}
	return (
		<WLayout wLayout="header-lside">
			<WLHeader>
				<WNavbar color="colored">
                    <ul className="navbar-icon" onClick={goHome}>
						World Data <br></br>
						Mapper
                    </ul>
					<ul>
						<NavbarOptions
							fetchUser={props.fetchUser} auth={auth} 
							setShowCreate={setShowCreate} setShowLogin={setShowLogin}	
							setShowUpdate={setShowUpdate}						 
						/>
					</ul>
				</WNavbar>
			</WLHeader>
			<WLMain>
				<MainContents 
					auth={auth} maps={maps} addNewMap={createNewMap}
					setShowDelete={setShowDelete} updateMapField={updateMapField}
					setActiveMap={setActiveMap} activeMap={activeMap} enterMap={enterMap}
					selectedMap={selectedMap} selectedRegion={selectedRegion}
				/>
			</WLMain>
            {
				showDelete && (<Delete setShowDelete={setShowDelete} deleteMap={deleteMap} map_id={deletedMap} />)
			}

			{
				showCreate && (<CreateAccount fetchUser={props.fetchUser} setShowCreate={setShowCreate} />)
			}

			{
				showLogin && (<Login fetchUser={props.fetchUser} setShowLogin={setShowLogin} />)
			}

			{
				showUpdate && (<UpdateAccount fetchUser={props.fetchUser} setShowUpdate={setShowUpdate}/>)
			}
		</WLayout>
	);
};

export default Homescreen;