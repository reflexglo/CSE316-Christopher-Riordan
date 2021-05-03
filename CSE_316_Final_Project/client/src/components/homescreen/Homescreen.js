import React, { useState, useEffect } 	from 'react';
import NavbarOptions 					from '../navbar/Navbar';
import Pathway							from '../navbar/Pathway'
import Login 							from '../modals/Login';
import Delete 							from '../modals/Delete';
import CreateAccount 					from '../modals/CreateAccount';
import UpdateAccount 					from '../modals/UpdateAccount';
import MainContents						from '../main/MainContents';
import { GET_DB_MAPS } 					from '../../cache/queries';
import { GET_DB_REGIONS }				from '../../cache/queries'
import * as mutations 					from '../../cache/mutations';
import { useMutation, useQuery } 		from '@apollo/client';
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide } from 'wt-frontend';



const Homescreen = (props) => {
	let maps 								= [];
	let regions								= [];
	const [viewing, setViewing]				= useState(false);
	const [activeRegion, setActiveRegion]	= useState(undefined);
	const [paths, setPaths]					= useState("");
	const [pathname, setPathname]			= useState("");
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
	const [AddRegion]		= useMutation(mutations.ADD_REGION);
	const [AddSubregion]	= useMutation(mutations.ADD_SUBREGION);

	const { loading, error, data, refetch } = useQuery(GET_DB_MAPS);
	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) { 
		maps = data.getAllMaps; 
	}

	const resetActiveMap = () => {
			let tempID = activeMap._id;
			let thisMap = maps.find(thisMap => thisMap._id === tempID);
			setActiveMap(thisMap);
	}

	const resetSelectedRegion = () => {
		let tempID = selectedRegion._id;
		let thisRegion = regions.find(thisRegion => thisRegion._id === tempID);
		setSelectedRegion(thisRegion);
	}

	const { loading: rloading, error: rerror, data: rdata, refetch: refetchRegions } = useQuery(GET_DB_REGIONS);
	if(rloading) { console.log(rloading, 'loading'); }
	if(rerror) { console.log(JSON.stringify(rerror,null,2)); }
	if(rdata) { regions = rdata.getAllRegions; }

    const auth = props.user === null ? false : true;

	const createNewMap = async (mapName) => {
		const length = maps.length
		const id = length >= 1 ? maps[length - 1].id + Math.floor((Math.random() * 100) + 1) : 1;
		let thisMap = {
			_id: '',
			id: id,
			name: mapName,
			owner: props.user._id,
			regions: [],
		}
		const { data } = await AddMap({ variables: { map: thisMap }, refetchQueries: [{ query: GET_DB_MAPS }] });
		return thisMap;
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

	const addRegion = async () => {
		const length = regions.length
		const id = length >= 1 ? regions[length - 1].id + Math.floor((Math.random() * 100) + 1) : 1;
		let thisRegion = {
			_id: '',
			id: id,
			owner: props.user._id,
			name: 'Untitled',
			capital: 'None',
			leader: 'None',
			landmarks: [],
			subregions: [],
		}
		const { data } = await AddRegion({ variables: { _id: activeMap._id, region: thisRegion, index: -1 }, refetchQueries: [{ query: GET_DB_MAPS }] });
	}
	const addSubregion = async () => {
		const length = regions.length
		const id = length >= 1 ? regions[length - 1].id + Math.floor((Math.random() * 100) + 1) : 1;
		let thisSubregion = {
			_id: '',
			id: id,
			owner: props.user._id,
			name: 'Untitled',
			capital: 'None',
			leader: 'None',
			landmarks: [],
			subregions: [],
		}
		const { data } = await AddSubregion({ variables: { _id: selectedRegion._id, region: thisSubregion, index: -1 }, refetchQueries: [{ query: GET_DB_REGIONS }] });
	}

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
		setPathname(activeMap.name);
		setPaths(activeMap._id);
	}
	const enterRegion = (curRegion) => {
		setSelectedRegion(curRegion);
		setPathname(pathname+" > "+curRegion.name);
		setPaths(paths+" "+curRegion._id);
	}

	const goHome = () => {
		setSelectedMap(undefined);
		setSelectedRegion(undefined);
		setActiveRegion(undefined);
		setPaths("");
		setPathname("");
	}
	return (
		<WLayout wLayout="header">
			<WLHeader>
				<WNavbar color="colored">
                    <ul className="navbar-icon" onClick={goHome}>
						World Data <br></br> 
						Mapper
                    </ul>
					{
					pathname.length > 0 && 
					<ul className="pathname">
							<Pathway
								pathname={pathname} paths={paths}
								setPathname={setPathname} setPaths={setPaths}
								maps={maps} regions={regions}
								setSelectedRegion={setSelectedRegion}
								setPaths={setPaths} setPathname={setPathname}
								setViewing={setViewing}
							/>
					</ul>
					}
					<ul>
						<NavbarOptions
							fetchUser={props.fetchUser} auth={auth} 
							setShowCreate={setShowCreate} setShowLogin={setShowLogin}	
							setShowUpdate={setShowUpdate} user={props.user}			 
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
					addRegion={addRegion} regions={regions} refetch={refetch}
					refetchRegions={refetchRegions} resetActiveMap={resetActiveMap}
					enterRegion={enterRegion} addSubregion={addSubregion}
					resetSelectedRegion={resetSelectedRegion} viewing={viewing}
					setViewing={setViewing} pathname={pathname} setSelectedRegion={setSelectedRegion}
					activeRegion={activeRegion} setActiveRegion={setActiveRegion}
				/>
			</WLMain>
            {
				showDelete && (<Delete setShowDelete={setShowDelete} deleteMap={deleteMap} map_id={deletedMap} />)
			}

			{
				showCreate && (<CreateAccount fetchUser={props.fetchUser} setShowCreate={setShowCreate} />)
			}

			{
				showLogin && (<Login fetchUser={props.fetchUser} setShowLogin={setShowLogin} refetch={refetch} refetchRegions={refetchRegions}/>)
			}

			{
				showUpdate && (<UpdateAccount fetchUser={props.fetchUser} setShowUpdate={setShowUpdate} user={props.user}/>)
			}
		</WLayout>
	);
};

export default Homescreen;