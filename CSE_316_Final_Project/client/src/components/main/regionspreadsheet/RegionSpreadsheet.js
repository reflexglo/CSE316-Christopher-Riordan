import React                            from 'react';
import WButton from 'wt-frontend/build/components/wbutton/WButton';
import WCol from 'wt-frontend/build/components/wgrid/WCol';
import WRow from 'wt-frontend/build/components/wgrid/WRow';
import WMHeader from 'wt-frontend/build/components/wmodal/WMHeader';
import WMMain from 'wt-frontend/build/components/wmodal/WMMain';
import RegionList                       from '../regionspreadsheet/RegionList'
import plus from './plus.jpg'
import undo from './undo.jpg'
import redo from './redo.jpg'

const RegionSpreadsheet = (props) => {
    const regionName = props.selectedRegion ? "Region Name: " + props.selectedRegion.name : "Region Name: " + props.selectedMap.name;

    return(
        <>
                <WRow>
                    <WCol size="1">
                        <WButton className="region-spreadsheet-header">
                        <img className="region-spreadsheet-plus" src={plus}></img>
                        </WButton>
                    </WCol>
                    <WCol size="1">
                        <WButton className="region-spreadsheet-header">
                        <img className="region-spreadsheet-do" src={undo}></img>
                        </WButton>
                    </WCol>
                    <WCol size="1">
                        <WButton className="region-spreadsheet-header">
                        <img className="region-spreadsheet-do" src={redo}></img>
                        </WButton>
                    </WCol>
                    <WCol size="6">
                            <div className="region-name">
                                 {regionName}
                            </div>
                    </WCol>
                    <WCol size="3">

                    </WCol>
                </WRow>
            <WMMain>
                <RegionList/>
            </WMMain>
        </>
    );
}

export default RegionSpreadsheet;