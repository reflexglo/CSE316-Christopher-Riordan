import React                            from 'react';
import RegionEntry                      from '../regionspreadsheet/RegionEntry'
import WCol from 'wt-frontend/build/components/wgrid/WCol';
import WRow from 'wt-frontend/build/components/wgrid/WRow';
import WMHeader from 'wt-frontend/build/components/wmodal/WMHeader';
import WMMain from 'wt-frontend/build/components/wmodal/WMMain';

const RegionList = (props) => {
    return(
        <>
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
                
            </WMMain>
        </>
    );
}

export default RegionList;