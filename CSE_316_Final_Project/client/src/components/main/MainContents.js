import React                            from 'react';
import WelcomeScreen					from '../main/WelcomeScreen';
import MapSelect                        from '../main/mapselect/MapSelect'
import RegionSpreadsheet                from '../main/regionspreadsheet/RegionSpreadsheet'
import RegionViewer                     from './regionviewer/RegionViewer'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
const MainContents = (props) => {
    const mapSelect = props.auth && props.selectedMap == undefined;
    const regionSpreadsheet = props.auth && props.selectedMap != undefined && props.viewing == false;
    const regionViewer = props.auth && props.activeRegion != undefined && props.viewing == true;
    return(
        <>
        {
            !props.auth && (<WelcomeScreen/>)
        }
        {
            mapSelect && (<MapSelect
                            maps={props.maps} addNewMap={props.addNewMap}
                            setShowDelete={props.setShowDelete} updateMapField={props.updateMapField}
                            setActiveMap={props.setActiveMap} activeMap={props.activeMap} enterMap={props.enterMap}
                            refetch={props.refetch}
                        />)
        }
        {
            regionSpreadsheet && (<RegionSpreadsheet
                                    selectedMap={props.selectedMap} selectedRegion={props.selectedRegion}
                                    addRegion={props.addRegion} regions={props.regions} activeMap={props.activeMap}
                                    refetchRegions={props.refetchRegions} refetch={props.refetch} resetActiveMap={props.resetActiveMap}
                                    enterRegion={props.enterRegion} addSubregion={props.addSubregion}
                                    resetSelectedRegion={props.resetSelectedRegion} setViewing={props.setViewing}
                                    setSelectedRegion={props.setSelectedRegion} setActiveRegion={props.setActiveRegion}
                                />)
        }
        {
            regionViewer && (<RegionViewer
                                pathname={props.pathname}
                                setViewing={props.setViewing} refetchRegions={props.refetchRegions}
                                activeRegion={props.activeRegion} setActiveRegion={props.setActiveRegion}
                            />)
        }
        </>
    );
}
export default MainContents;