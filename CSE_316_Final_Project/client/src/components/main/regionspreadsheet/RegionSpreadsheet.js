import React                            from 'react';
import { useState, useEffect } 	        from 'react';
import WButton from 'wt-frontend/build/components/wbutton/WButton';
import WCol from 'wt-frontend/build/components/wgrid/WCol';
import WRow from 'wt-frontend/build/components/wgrid/WRow';
import WMHeader from 'wt-frontend/build/components/wmodal/WMHeader';
import WMMain from 'wt-frontend/build/components/wmodal/WMMain';
import RegionList                       from '../regionspreadsheet/RegionList'
import plus from './plus.jpg'
import undo from './undo.jpg'
import redo from './redo.jpg'
import WLayout from 'wt-frontend/build/components/wlayout/WLayout';
import Hotkeys from 'react-hot-keys';

const RegionSpreadsheet = (props) => {
    const regionName = props.selectedRegion ? "Region Name: " + props.selectedRegion.name : "Region Name: " + props.selectedMap.name;
    const [regionLength, setRegionLength] = useState(0);
    const [activeMapLength, setActiveMapLength] = useState(0);
    const [addedRegion, setAddedRegion] = useState(false);
    const [subregionLength, setSubregionLength] = useState(0);
    const [activeRegionLength, setActiveRegionLength] = useState(0);
    const [addedSubregion, setAddedSubregion] = useState(false);
    const [sortTime, setSortTime] = useState(false);
    const [subSortTime, setSubSortTime] = useState(false);
    if(props.selectedRegion){
        if(addedSubregion){
            if(subregionLength>props.regions.length || activeRegionLength>props.selectedRegion.subregions.length){
                props.refetchRegions();
                props.refetch();
                props.resetSelectedRegion();
            }
            else{
                setAddedSubregion(false);
                props.resetSelectedRegion();
            }
        }
        else{
            if(subregionLength>props.regions.length){
                setSubregionLength(props.regions.length);
                setActiveRegionLength(props.selectedRegion.subregions.length);
            }
        }
    }
    else{
        if(addedRegion){
            if(regionLength>props.regions.length || activeMapLength>props.activeMap.regions.length){
                props.refetchRegions();
                props.refetch();
                props.resetActiveMap();
            }
            else{
                setAddedRegion(false);
                props.resetActiveMap();
            }
        }
        else{
            if(regionLength>props.regions.length){
                setRegionLength(props.regions.length);
                setActiveMapLength(props.activeMap.regions.length);
            }
        }
    }

    if(sortTime){
        props.refetchRegions();
        props.refetch();
        props.resetActiveMap();
        props.resetSelectedRegion();
    }

    if(subSortTime){
        props.refetchRegions();
        props.refetch();
        props.resetSelectedRegion();
    }

    const handleAdding = () => {
        if(props.selectedRegion){
            props.addSubregion();
            setSubregionLength(props.regions.length+1);
            setActiveRegionLength(props.selectedRegion.subregions.length+1);
            setAddedSubregion(true);
        }
        else{
            props.addRegion();
            setRegionLength(props.regions.length+1);
            setActiveMapLength(props.activeMap.regions.length+1);
            setAddedRegion(true);
        }
    }

    const sortingTime = () => {
        setSortTime(true);
        setTimeout(() => {  
             setSortTime(false);
        },200);
    }

    const subSortingTime = () => {
        setSubSortTime(true);
        setTimeout(() => {  
             setSubSortTime(false);
        },200);
    }

    const undoTime = () => {
        props.tpsUndo();
        setSortTime(true);
        setTimeout(() => {  
             setSortTime(false);
        },200);
    }

    const redoTime = () => {
        props.tpsRedo();
        setSortTime(true);
        setTimeout(() => {  
             setSortTime(false);
        },200);
    }


    return(
        <>
        <WLayout>
                <WRow>
                    <WCol size="3">
                        <ul>
                        <WButton className="region-spreadsheet-header" onClick={handleAdding}>
                            <div className="region-spreadsheet-plus">
                                <i className="material-icons">add</i>
                            </div>
                        </WButton>
                        <>
                        {
                            props.hasUndo() ?
                            <>
                            <WButton className="region-spreadsheet-header" onClick={undoTime}>
                                <div className="region-spreadsheet-do">
                                    <i className="material-icons">undo</i>
                                </div>
                            </WButton>
                            <Hotkeys 
                                keyName="ctrl+z" 
                                onKeyDown={undoTime}
                            >
                            </Hotkeys>
                            </>
                            :
                            <WButton className="region-spreadsheet-header">
                                <div className="region-spreadsheet-no">
                                    <i className="material-icons">undo</i>
                                </div>
                            </WButton>
                        }
                        </>
                        <>
                            {
                                props.hasRedo() ?
                                <>
                                <WButton className="region-spreadsheet-header" onClick={redoTime}>
                                    <div className="region-spreadsheet-do">
                                        <i className="material-icons">redo</i>
                                    </div>
                                </WButton>
                                <Hotkeys 
                                keyName="ctrl+y" 
                                onKeyDown={redoTime}
                            >
                            </Hotkeys>
                            </>
                                :
                                <WButton className="region-spreadsheet-header">
                                    <div className="region-spreadsheet-no">
                                        <i className="material-icons">redo</i>
                                    </div>
                                </WButton>
                            }
                        </>
                        </ul>
                    </WCol>
                    <WCol size="6">
                            <div className="region-name">
                                 {regionName}
                            </div>
                    </WCol>
                    <WCol size="3">

                    </WCol>
                </WRow>
            <WMMain className="region-spreadsheet-main">
                <RegionList
                    activeMap={props.activeMap} regions={props.regions}
                    setSelectedRegion={props.setSelectedRegion}
                    selectedRegion={props.selectedRegion} setViewing={props.setViewing}
                    enterRegion={props.enterRegion} setActiveRegion={props.setActiveRegion}
                    deleteRegion={props.deleteRegion} deleteSubregion={props.deleteSubregion}
                    updateRegionField={props.updateRegionField} sortRegions={props.sortRegions}
                    sortingTime={sortingTime} sortSubregions={props.sortSubregions}
                    subSortingTime={subSortingTime} setSubLandmarkList={props.setSubLandmarkList}
                    tps={props.tps}
                />
            </WMMain>
        </WLayout>
        </>
    );
}

export default RegionSpreadsheet;