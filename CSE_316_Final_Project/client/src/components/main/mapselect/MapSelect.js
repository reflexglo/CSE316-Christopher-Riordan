import React                            from 'react';
import { useState, useEffect } 	        from 'react';
import MapList                          from '../mapselect/MapList'
import WRow from 'wt-frontend/build/components/wgrid/WRow';
import WCol from 'wt-frontend/build/components/wgrid/WCol';
import logo from './globe.jpg';
import WMMain from 'wt-frontend/build/components/wmodal/WMMain';
import WMHeader from 'wt-frontend/build/components/wmodal/WMHeader';
import WModal from 'wt-frontend/build/components/wmodal/WModal';
import WLayout from 'wt-frontend/build/components/wlayout/WLayout';
import WButton from 'wt-frontend/build/components/wbutton/WButton';
import { WNavItem, WInput } from 'wt-frontend';


const MapSelect = (props) => {
    let mapName = "";
    const [mapLength, setMapLength] = useState(0);
    const [addedMap, setAddedMap] = useState(false);
    if(addedMap){
        if(mapLength>props.maps.length){
            props.refetch();
        }
        else{
            setAddedMap(false);
        }
    }
    else{
        if(mapLength>props.maps.length){
            setMapLength(props.maps.length);
        }
    }
    const handleAdding = () => {
        if(mapName != ''){
            props.addNewMap(mapName);
            setMapLength(props.maps.length+1);
            setAddedMap(true);
            mapName = "";
        }
    }
    const handleNaming = (e) => {
        const { name, value } = e.target;
        mapName = value;
    }
    return(
        <>
        <WLayout>
        <WMHeader className="map-header">
            Your maps
        </WMHeader>
        <WMMain className="map-select">
            <WRow>
                <WCol size="6" className="maps-list">
                    <MapList className="map-list"
                        maps={props.maps} setShowDelete={props.setShowDelete}
                        updateMapField={props.updateMapField} activeMap={props.activeMap}
                        setActiveMap={props.setActiveMap} 
                        addNewMap={props.addNewMap}
                    />
                </WCol>
                <WCol size="6">
                    <img className="map-logo" src={logo}></img>
                    <WRow>
                        <WCol size="4">
                        <WButton className="add-map" onClick={handleAdding}>
                        <div className="addmap-text">
                            Create New Map
                        </div>
                        </WButton>
                        </WCol>
                        <WCol size="8">
                        <WInput className="list-item-edit" inputClass="list-item-edit-input" wType="lined" name='name' onBlur={handleNaming} autoFocus={true} defaultValue={mapName} color="black"/>
                        </WCol>
                    </WRow>
                </WCol>
            </WRow>
        </WMMain>
        {
                    props.activeMap && 
                    <WButton className="select-map" onClick={props.enterMap}>
                        <div className="addmap-text">
                            Select Map
                        </div>
                    </WButton>
                }
        </WLayout>
        </>
    );
}

export default MapSelect;