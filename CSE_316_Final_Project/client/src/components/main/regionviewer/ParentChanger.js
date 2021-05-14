import React, {useState}                            from 'react';
import WButton from 'wt-frontend/build/components/wbutton/WButton';
import WCol from 'wt-frontend/build/components/wgrid/WCol';
import WRow from 'wt-frontend/build/components/wgrid/WRow';
import WLayout from 'wt-frontend/build/components/wlayout/WLayout';
import WMMain from 'wt-frontend/build/components/wmodal/WMMain';

const ParentChanger = (props) => {
    let maps = props.maps;
    let regions = props.regions;
    const parentRegionID = props.selectedRegion == undefined ? '' : props.selectedRegion._id;
    const parentMapID = props.selectedRegion == undefined ? props.activeMap._id : '';
    const [changeMap,setChangeMap] = useState(undefined);
    const [changeRegion,setChangeRegion] = useState(undefined);


    return(
        <WLayout>
            <>
                {
                    (changeMap == undefined && changeRegion == undefined) &&
                    <div className="change-title">
                        Maps
                    </div>
                }
                {
                    (changeMap != undefined && changeRegion == undefined) &&
                    <div className="change-title">
                        {changeMap.name}
                    </div>
                }
                {
                    (changeMap != undefined && changeRegion != undefined) &&
                    <div className="change-title">
                        {changeRegion.name}
                    </div>
                }
            </>
            <WMMain className="change-list">
                <>
                    {
                        (changeMap == undefined && changeRegion == undefined) && maps.map( thisMap => (
                            <div className="change-entry" onClick={() => setChangeMap(thisMap)}>
                                {thisMap.name}
                            </div>
                        ))
                    }
                    {
                        (changeMap != undefined && changeRegion == undefined) && regions.filter(thisRegion => changeMap.regions.includes(thisRegion._id)).map(thisRegion => (
                            <div className="change-entry" onClick={() => setChangeRegion(thisRegion)}>
                                {thisRegion.name}
                            </div>
                        ))
                    }
                    {
                        (changeMap != undefined && changeRegion != undefined) && regions.filter(thisRegion => changeRegion.subregions.includes(thisRegion._id)).map(thisRegion => (
                            <div className="change-entry" onClick={() => setChangeRegion(thisRegion)}>
                                {thisRegion.name}
                            </div>
                        ))
                    }
                </>
            </WMMain>
            <>
                    {
                        (changeMap != undefined && changeRegion == undefined) &&
                        <WButton className="select-parent" onClick={() => props.changeParent(changeMap._id,parentMapID,parentRegionID)}>
                            Select New Parent
                        </WButton>
                    }
                    {
                        (changeMap != undefined && changeRegion != undefined) &&
                        <WButton className="select-parent" onClick={() => props.changeSubparent(changeRegion._id,parentMapID,parentRegionID,changeMap._id)}>
                            Select New Parent
                        </WButton>
                    }
            </>
        </WLayout>
    );
}

export default ParentChanger;