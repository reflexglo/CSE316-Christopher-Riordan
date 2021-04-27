import React                            from 'react';
import WelcomeScreen					from '../main/WelcomeScreen';
import MapSelect                        from '../main/mapselect/MapSelect'
import RegionSpreadsheet                from '../main/regionspreadsheet/RegionSpreadsheet'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
const MainContents = (props) => {
    const mapSelect = props.auth && props.selectedMap == undefined;
    const regionSpreadsheet = props.auth && props.selectedMap != undefined;
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
                        />)
        }
        {
            regionSpreadsheet && (<RegionSpreadsheet
                                    selectedMap={props.selectedMap} selectedRegion={props.selectedRegion}
                                />)
        }
        </>
    );
}
export default MainContents;