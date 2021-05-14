import React                            from 'react';
import RegionEntry                      from '../regionspreadsheet/RegionEntry'
import WCol from 'wt-frontend/build/components/wgrid/WCol';
import WRow from 'wt-frontend/build/components/wgrid/WRow';
import WMHeader from 'wt-frontend/build/components/wmodal/WMHeader';
import WMMain from 'wt-frontend/build/components/wmodal/WMMain';
import WLayout from 'wt-frontend/build/components/wlayout/WLayout';

const RegionList = (props) => {
    const mapRegions = [];
    const subRegions = [];
for(let k = 0;k<props.activeMap.regions.length;k++){
    for(let i = 0;i<props.regions.length;i++){
            if(props.regions[i]._id == props.activeMap.regions[k]){
                mapRegions.push(props.regions[i]);
            }
        }
    }
    if(props.selectedRegion){
for(let k = 0;k<props.selectedRegion.subregions.length;k++){
        for(let i = 0;i<props.regions.length;i++){
                if(props.regions[i]._id == props.selectedRegion.subregions[k]){
                    subRegions.push(props.regions[i]);
                }
            }
        }
    }

    const handleSorting = (filter) => {
        props.sortRegions(filter);
        props.sortingTime();
    }

    const handleSubSorting = (filter) => {
        props.sortSubregions(filter);
        props.subSortingTime();
    }

    if(props.selectedRegion){
            return(
                <>
                <WLayout>
                    <WMHeader className="region-list-header">
                        <WRow>
                        <>
                                {
                                    subRegions.length > 0 ?
                                    <>
                            <WCol size="2" className="sort-arrow" onClick={() => handleSorting("name")}>
                                Name: <i className="material-icons">expand_more</i>
                            </WCol>
                            <WCol size="2" className="sort-arrow" onClick={() => handleSorting("capital")}>
                                Capital: <i className="material-icons">expand_more</i>
                            </WCol>
                            <WCol size="3" className="sort-arrow" onClick={() => handleSorting("leader")}>
                                Leader: <i className="material-icons">expand_more</i>
                            </WCol>
                            <WCol size="1">
                                Flag:
                            </WCol>
                            <WCol size="4">
                                Landmarks:
                            </WCol>
                                    </>
                                    :
                                    <>
                                <WCol size="2">
                                    Name:
                                </WCol>
                                <WCol size="2">
                                    Capital:
                                </WCol>
                                <WCol size="3">
                                    Leader:
                                </WCol>
                                <WCol size="1">
                                    Flag:
                                </WCol>
                                <WCol size="4">
                                    Landmarks:
                                </WCol>
                                    </>
                                }
                            </>
                        </WRow>
                    </WMHeader>
                    <WMMain className="region-list-main">
                        {
                            subRegions.length > 0 && subRegions.map(thisRegion => (
                                <RegionEntry
                                    region={thisRegion} setViewing={props.setViewing}
                                    enterRegion={props.enterRegion} setSelectedRegion={props.setSelectedRegion}
                                    setActiveRegion={props.setActiveRegion} deleteRegion={props.deleteSubregion}
                                    updateRegionField={props.updateRegionField} regions={props.regions}
                                    setSubLandmarkList={props.setSubLandmarkList}
                                />
                            ))
                        }
                    </WMMain>
                </WLayout>
                </>
            );
    }
    else{
            return(
                <>
                <WLayout>
                    <WMHeader className="region-list-header">
                        <WRow>
                            <>
                                {
                                    mapRegions.length > 0 ?
                                    <>
                            <WCol size="2" className="sort-arrow" onClick={() => handleSorting("name")}>
                                Name: <i className="material-icons">expand_more</i>
                            </WCol>
                            <WCol size="2" className="sort-arrow" onClick={() => handleSorting("capital")}>
                                Capital: <i className="material-icons">expand_more</i>
                            </WCol>
                            <WCol size="3" className="sort-arrow" onClick={() => handleSorting("leader")}>
                                Leader: <i className="material-icons">expand_more</i>
                            </WCol>
                            <WCol size="1">
                                Flag:
                            </WCol>
                            <WCol size="4">
                                Landmarks:
                            </WCol>
                                    </>
                                    :
                                    <>
                                <WCol size="2">
                                    Name:
                                </WCol>
                                <WCol size="2">
                                    Capital:
                                </WCol>
                                <WCol size="3">
                                    Leader:
                                </WCol>
                                <WCol size="1">
                                    Flag:
                                </WCol>
                                <WCol size="4">
                                    Landmarks:
                                </WCol>
                                    </>
                                }
                            </>
                        </WRow>
                    </WMHeader>
                    <WMMain className="region-list-main">
                        {
                            mapRegions.length > 0 && mapRegions.map(thisRegion => (
                                <RegionEntry
                                    region={thisRegion} setViewing={props.setViewing}
                                    enterRegion={props.enterRegion} setSelectedRegion={props.setSelectedRegion}
                                    setActiveRegion={props.setActiveRegion} deleteRegion={props.deleteRegion}
                                    updateRegionField={props.updateRegionField} regions={props.regions}
                                    setSubLandmarkList={props.setSubLandmarkList}
                                />
                            ))
                        }
                    </WMMain>
                </WLayout>
                </>
            );
    }
}

export default RegionList;