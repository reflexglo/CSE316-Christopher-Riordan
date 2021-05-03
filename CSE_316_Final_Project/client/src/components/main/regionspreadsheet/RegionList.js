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
    for(let i = 0;i<props.regions.length;i++){
        for(let k = 0;k<props.activeMap.regions.length;k++){
            if(props.regions[i]._id == props.activeMap.regions[k]){
                mapRegions.push(props.regions[i]);
            }
        }
    }
    if(props.selectedRegion){
        for(let i = 0;i<props.regions.length;i++){
            for(let k = 0;k<props.selectedRegion.subregions.length;k++){
                if(props.regions[i]._id == props.selectedRegion.subregions[k]){
                    subRegions.push(props.regions[i]);
                }
            }
        }
    }
    if(props.selectedRegion){
            return(
                <>
                <WLayout>
                    <WMHeader className="region-list-header">
                        <WRow>
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
                        </WRow>
                    </WMHeader>
                    <WMMain className="region-list-main">
                        {
                            subRegions.length > 0 && subRegions.map(thisRegion => (
                                <RegionEntry
                                    region={thisRegion} setViewing={props.setViewing}
                                    enterRegion={props.enterRegion} setSelectedRegion={props.setSelectedRegion}
                                    setActiveRegion={props.setActiveRegion}
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
                        </WRow>
                    </WMHeader>
                    <WMMain className="region-list-main">
                        {
                            mapRegions.length > 0 && mapRegions.map(thisRegion => (
                                <RegionEntry
                                    region={thisRegion} setViewing={props.setViewing}
                                    enterRegion={props.enterRegion} setSelectedRegion={props.setSelectedRegion}
                                    setActiveRegion={props.setActiveRegion}
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