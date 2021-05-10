import React, { useState, useEffect } 	from 'react';
import NavbarOptions 					from '../navbar/Navbar';
import Pathway							from '../navbar/Pathway'
import Login 							from '../modals/Login';
import Delete 							from '../modals/Delete';
import DeleteRegionModal						from '../modals/DeleteRegionModal';
import DeleteSubregionModal				from '../modals/DeleteSubregionModal'
import CreateAccount 					from '../modals/CreateAccount';
import UpdateAccount 					from '../modals/UpdateAccount';
import MainContents						from '../main/MainContents';
import { GET_DB_MAPS } 					from '../../cache/queries';
import { GET_DB_REGIONS }				from '../../cache/queries'
import * as mutations 					from '../../cache/mutations';
import { useMutation, useQuery } 		from '@apollo/client';
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide } from 'wt-frontend';
import { UpdateRegion_Transaction, SortRegions_Transaction, EditRegion_Transaction, SortSubregions_Transaction } from '../../utils/jsTPS'



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
	const [deletedRegion, setDeletedRegion]			= useState("");
	const [deletedSubregion, setDeletedSubregion]			= useState("");
    const [showDelete, toggleShowDelete] 	= useState(false);
	const [showLogin, toggleShowLogin] 		= useState(false);
	const [showCreate, toggleShowCreate] 	= useState(false);
	const [showUpdate, toggleShowUpdate] 	= useState(false);
	const [showDeleteRegion, toggleShowDeleteRegion] = useState(false);
	const [showDeleteSubregion, toggleShowDeleteSubregion] = useState(false);
	const [nameSort, toggleNameSort]		= useState(false);
	const [capitolSort, toggleCapitolSort]	= useState(false);
	const [leaderSort, toggleLeaderSort]	= useState(false);

	const [AddMap] 			= useMutation(mutations.ADD_MAP);
	const [DeleteMap]		= useMutation(mutations.DELETE_MAP);
	const [UpdateMapField] 	= useMutation(mutations.UPDATE_MAP_FIELD);
	const [AddRegion]		= useMutation(mutations.ADD_REGION);
	const [AddSubregion]	= useMutation(mutations.ADD_SUBREGION);
	const [DeleteRegion]	= useMutation(mutations.DELETE_REGION);
	const [DeleteSubregion]	= useMutation(mutations.DELETE_SUBREGION);
	const [UpdateRegionField] = useMutation(mutations.UPDATE_REGION_FIELD);
	const [SortRegions]		= useMutation(mutations.SORT_REGIONS);
	const [SortSubregions]	= useMutation(mutations.SORT_SUBREGIONS);

	const { loading, error, data, refetch } = useQuery(GET_DB_MAPS);
	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(JSON.stringify(error,null,2)); }
	if(data) { 
		maps = data.getAllMaps; 
	}

	const hasUndo =  () => {
		return props.tps.hasTransactionToUndo();
	}

	const hasRedo =  () => {
		return props.tps.hasTransactionToRedo();
	}

	const tpsUndo = async () => {
		const retVal = await props.tps.undoTransaction();
		refetchRegions();
		refetch();
		return retVal;
	}

	const tpsRedo = async () => {
		const retVal = await props.tps.doTransaction();
		refetchRegions();
		refetch();
		return retVal;
	}

	const resetActiveMap = () => {
		if(activeMap){
			let tempID = activeMap._id;
			let thisMap = maps.find(thisMap => thisMap._id === tempID);
			setActiveMap(thisMap);
		}
	}

	const resetSelectedRegion = () => {
		if(selectedRegion){
			let tempID = selectedRegion._id;
			let thisRegion = regions.find(thisRegion => thisRegion._id === tempID);
			setSelectedRegion(thisRegion);
		}
	}

	const resetActiveRegion = () => {
		if(activeRegion){
			let tempID = activeRegion._id;
			let thisRegion = regions.find(thisRegion => thisRegion._id === tempID);
			setActiveRegion(thisRegion);
		}
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
		let transaction = new UpdateRegion_Transaction(activeMap._id,undefined,thisRegion,1,AddRegion,DeleteRegion);
		props.tps.addTransaction(transaction);
		tpsRedo();
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
		let transaction = new UpdateRegion_Transaction(undefined,selectedRegion._id,thisSubregion,3,AddSubregion,DeleteSubregion);
		props.tps.addTransaction(transaction);
		tpsRedo();
	}

	const deleteRegion = async (region) => {
		let transaction = new UpdateRegion_Transaction(activeMap._id,undefined,region,0,AddRegion,DeleteRegion);
		props.tps.addTransaction(transaction);
		tpsRedo();
	}

	const deleteSubregion = async (region) => {
		let transaction = new UpdateRegion_Transaction(undefined,selectedRegion._id,region,2,AddSubregion,DeleteSubregion);
		props.tps.addTransaction(transaction);
		tpsRedo();
	}

	const updateRegionField = async (regionID, field, value, prev) => {
		let transaction = new EditRegion_Transaction(regionID, field, prev, value, UpdateRegionField);
		props.tps.addTransaction(transaction);
		tpsRedo();
	}

	const addLandmark = async (landmarkName) => {
		let transaction = new UpdateRegion_Transaction(undefined,activeRegion._id,undefined,5,UpdateRegionField,UpdateRegionField,-1,landmarkName);
		props.tps.addTransaction(transaction);
		tpsRedo();
	}

	const removeLandmark = async (index) => {
		let transaction = new UpdateRegion_Transaction(undefined,activeRegion._id,undefined,4,UpdateRegionField,UpdateRegionField,-1,index);
		props.tps.addTransaction(transaction);
		tpsRedo();
	}

	const viewNextRegion = () => {
		if(selectedRegion){
			let index = selectedRegion.subregions.indexOf(activeRegion._id);
			if(index < selectedRegion.subregions.length-1){
				index = index + 1;
				for(let i = 0;i<regions.length;i++){
					if(selectedRegion.subregions[index] == regions[i]._id){
						setActiveRegion(regions[i]);
					}
				}
			}
		}
		else{
			let index = activeMap.regions.indexOf(activeRegion._id);
			if(index < activeMap.regions.length-1){
				index = index + 1;
				for(let i = 0;i<regions.length;i++){
					if(activeMap.regions[index] == regions[i]._id){
						setActiveRegion(regions[i]);
					}
				}
			}
		}
	}

	const viewPreviousRegion = () => {
		if(selectedRegion){
			let index = selectedRegion.subregions.indexOf(activeRegion._id);
			if(index > 0){
				index = index - 1;
				for(let i = 0;i<regions.length;i++){
					if(selectedRegion.subregions[index] == regions[i]._id){
						setActiveRegion(regions[i]);
					}
				}
			}
		}
		else{
			let index = activeMap.regions.indexOf(activeRegion._id);
			if(index > 0){
				index = index - 1;
				for(let i = 0;i<regions.length;i++){
					if(activeMap.regions[index] == regions[i]._id){
						setActiveRegion(regions[i]);
					}
				}
			}
		}
	}

	const getCurrentRegions = () => {
		let curRegions = [];
			for(let i = 0;i<activeMap.regions.length;i++){
				for(let k = 0;k<regions.length;k++){
					if(activeMap.regions[i] == regions[k]._id){
						curRegions.push(regions[k]);
					}
				}
			}
			return curRegions;
	}

	const getCurrentSubregions = () => {
		let curRegions = [];
			for(let i = 0;i<selectedRegion.subregions.length;i++){
				for(let k = 0;k<regions.length;k++){
					if(selectedRegion.subregions[i] == regions[k]._id){
						curRegions.push(regions[k]);
					}
				}
			}
			return curRegions;
	}

	const sortRegions = (filter) => {
		let dir;
		if(filter == "name"){
			toggleNameSort(!nameSort);
			toggleCapitolSort(false);
			toggleLeaderSort(false);
			dir = nameSort ? 1 : -1;
		}
		if(filter == "capital"){
			toggleNameSort(false);
			toggleCapitolSort(!capitolSort);
			toggleLeaderSort(false);
			dir = capitolSort ? 1 : -1;
		}
		if(filter == "leader"){
			toggleNameSort(false);
			toggleCapitolSort(false);
			toggleLeaderSort(!leaderSort);
			dir = leaderSort ? 1 : -1;
		}
		let curRegions = getCurrentRegions();
		let transaction = new SortRegions_Transaction(curRegions,dir,filter,activeMap._id,SortRegions);
		props.tps.addTransaction(transaction);
		tpsRedo();
	}
	const sortSubregions = (filter) => {
		let dir;
		if(filter == "name"){
			toggleNameSort(!nameSort);
			toggleCapitolSort(false);
			toggleLeaderSort(false);
			dir = nameSort ? 1 : -1;
		}
		if(filter == "capital"){
			toggleNameSort(false);
			toggleCapitolSort(!capitolSort);
			toggleLeaderSort(false);
			dir = capitolSort ? 1 : -1;
		}
		if(filter == "leader"){
			toggleNameSort(false);
			toggleCapitolSort(false);
			toggleLeaderSort(!leaderSort);
			dir = leaderSort ? 1 : -1;
		}
		let curRegions = getCurrentSubregions();
		let transaction = new SortSubregions_Transaction(curRegions,dir,filter,selectedRegion._id,SortSubregions);
		props.tps.addTransaction(transaction);
		tpsRedo();
	}

    const setShowLogin = () => {
		toggleShowDelete(false);
		toggleShowCreate(false);
		toggleShowLogin(!showLogin);
		toggleShowUpdate(false);
		toggleShowDeleteRegion(false);
		toggleShowDeleteSubregion(false);
	};

	const setShowCreate = () => {
		toggleShowDelete(false);
		toggleShowLogin(false);
		toggleShowCreate(!showCreate);
		toggleShowUpdate(false);
		toggleShowDeleteRegion(false);
		toggleShowDeleteSubregion(false);
	};

	const setShowUpdate = () => {
		toggleShowDelete(false);
		toggleShowLogin(false);
		toggleShowCreate(false);
		toggleShowUpdate(!showUpdate);
		toggleShowDeleteRegion(false);
		toggleShowDeleteSubregion(false);
	};

    const setShowDelete = (isDelete,map_id) => {
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleShowDelete(isDelete);
		toggleShowUpdate(false);
		toggleShowDeleteRegion(false);
		toggleShowDeleteSubregion(false);
		setDeletedMap(map_id);
	}
	const setShowDeleteRegion = (isDelete,region_id) => {
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleShowDelete(false);
		toggleShowUpdate(false);
		toggleShowDeleteRegion(isDelete);
		toggleShowDeleteSubregion(false);
		setDeletedRegion(region_id);
	}
	const setShowDeleteSubregion = (isDelete,region_id) => {
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleShowDelete(false);
		toggleShowUpdate(false);
		toggleShowDeleteRegion(false);
		toggleShowDeleteSubregion(isDelete);
		setDeletedSubregion(region_id);
	}
	const enterMap = () => {
		setSelectedMap(activeMap);
		setPathname(activeMap.name);
		setPaths(activeMap._id);
		props.tps.clearAllTransactions();
	}
	const enterRegion = (curRegion) => {
		setSelectedRegion(curRegion);
		setPathname(pathname+" > "+curRegion.name);
		setPaths(paths+" "+curRegion._id);
		props.tps.clearAllTransactions();
	}

	const goHome = () => {
		setSelectedMap(undefined);
		setSelectedRegion(undefined);
		setActiveRegion(undefined);
		setViewing(false);
		setPaths("");
		setPathname("");
		props.tps.clearAllTransactions();
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
								setViewing={setViewing} viewing={viewing}
								viewNextRegion={viewNextRegion} viewPreviousRegion={viewPreviousRegion}
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
					deleteRegion={setShowDeleteRegion} deleteSubregion={setShowDeleteSubregion}
					updateRegionField={updateRegionField} resetActiveRegion={resetActiveRegion}
					tpsUndo={tpsUndo} tpsRedo={tpsRedo} addLandmark={addLandmark} removeLandmark={removeLandmark}
					sortRegions={sortRegions} sortSubregions={sortSubregions}
				/>
			</WLMain>
            {
				showDelete && (<Delete setShowDelete={setShowDelete} deleteMap={deleteMap} map_id={deletedMap} />)
			}

			{
				showDeleteRegion && (<DeleteRegionModal setShowDeleteRegion={setShowDeleteRegion} deleteRegion={deleteRegion} region_id={deletedRegion} />)
			}

			{
				showDeleteSubregion && (<DeleteSubregionModal setShowDeleteSubregion={setShowDeleteSubregion} deleteSubregion={deleteSubregion} region_id={deletedSubregion} />)
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