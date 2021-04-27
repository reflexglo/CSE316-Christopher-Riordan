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


const MapSelect = (props) => {
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
                {
                    props.activeMap && 
                    <WButton className="add-map" onClick={props.enterMap}>
                        <div className="addmap-text">
                            Select Map
                        </div>
                    </WButton>
                }
                </WCol>
                <WCol size="6">
                    <img className="map-logo" src={logo}></img>
                    <WButton className="add-map" onClick={props.addNewMap}>
                        <div className="addmap-text">
                            Create New Map
                        </div>
                    </WButton>
                </WCol>
            </WRow>
        </WMMain>
        </WLayout>
        </>
    );
}

export default MapSelect;