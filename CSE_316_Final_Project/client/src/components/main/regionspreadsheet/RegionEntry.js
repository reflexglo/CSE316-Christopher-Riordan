import React                            from 'react';
import { WNavItem } from 'wt-frontend';
import WCol from 'wt-frontend/build/components/wgrid/WCol';
import WRow from 'wt-frontend/build/components/wgrid/WRow';

const RegionEntry = (props) => {
    const activeStyle = props.isActive ? "active-region" : "item-region";
    return(
        <WNavItem className={activeStyle} onClick={() => props.setActiveRegion(props.region)}>
            <WRow>
                    <WCol size="2">
                        <div className="region-entry">
                        {props.region.name}&nbsp;
                        </div>     
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
                    <div className="region-entry">
                        {props.region.landmarks}&nbsp;
                        </div>     
                    </WCol>
            </WRow>
        </WNavItem>
    );
}

export default RegionEntry;