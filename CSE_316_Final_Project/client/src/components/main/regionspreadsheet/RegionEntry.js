import React                            from 'react';
import { WNavItem } from 'wt-frontend';
import WCol from 'wt-frontend/build/components/wgrid/WCol';
import WRow from 'wt-frontend/build/components/wgrid/WRow';

const RegionEntry = (props) => {
    const activeStyle = props.isActive ? "active-region" : "item-region";

    const handleViewing = () => {
        props.setViewing(true);
        props.setActiveRegion(props.region);
    }

    const handleSelecting = () => {
        props.setSelectedRegion(props.region);
        props.enterRegion(props.region);
    }

    return(
        <WNavItem className={activeStyle}>
            <WRow>
                    <WCol size="2">
                        <WRow>
                            <WCol size="1">
                                <div onClick={() => props.deleteRegion(true,props.region)}>
                                    X
                                </div>
                            </WCol>
                            <WCol size="11">
                            <div className="region-entry" onClick={handleSelecting}>
                            {props.region.name}&nbsp;
                            </div> 
                            </WCol>
                        </WRow>
                            
                    </WCol>
                    <WCol size="2">
                    <div className="region-entry">
                        {props.region.capital}&nbsp;
                        </div>     
                    </WCol>
                    <WCol size="3">
                    <div className="region-entry">
                        {props.region.leader}&nbsp;
                        </div>     
                    </WCol>
                    <WCol size="1">
                    </WCol>
                    <WCol size="4">
                    <div className="region-entry" onClick={handleViewing}>
                        {props.region.landmarks}&nbsp;
                        </div>     
                    </WCol>
            </WRow>
        </WNavItem>
    );
}

export default RegionEntry;