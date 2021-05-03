import React                            from 'react';
import WButton from 'wt-frontend/build/components/wbutton/WButton';
import WCol from 'wt-frontend/build/components/wgrid/WCol';
import WRow from 'wt-frontend/build/components/wgrid/WRow';
import WLayout from 'wt-frontend/build/components/wlayout/WLayout';
import LandmarkList from '../regionviewer/LandmarkList'
import undo from './undo.jpg'
import redo from './redo.jpg'
import WMMain from 'wt-frontend/build/components/wmodal/WMMain';
import WMFooter from 'wt-frontend/build/components/wmodal/WMFooter';
import WInput from 'wt-frontend/build/components/winput/WInput';

const RegionViewer = (props) => {
    let landmarkName = "";
    const pathNameArr = props.pathname.split(" > ");
    const parentName = pathNameArr[pathNameArr.length-1];

    const handleReturn = () => {
        props.setViewing(false);
        props.setActiveRegion(undefined);
    }

    const handleNaming = (e) => {
        const { name, value } = e.target;
        landmarkName = value;
    }
    return(
    <WLayout>
        <WRow>
            <WCol size="2">

            </WCol>
            <WCol size="4">
                <ul>
                    <WButton className="region-viewer-header">
                        <img src={undo} className="region-viewer-do"></img>
                    </WButton>
                    <WButton className="region-viewer-header">
                        <img src={redo} className="region-viewer-do"></img>
                    </WButton>
                </ul>
                <div className="region-viewer-main">
                    Region Picture
                </div>
                <div className="region-viewer-main">
                    Region Name: {props.activeRegion.name}
                </div>
                <div className="region-viewer-main">
                    <WRow>
                        <WCol size="2">
                        Parent Region: 
                        </WCol>
                        <WCol size="6">
                            <div className="parent-name" onClick={handleReturn}>
                            {parentName}
                            </div>
                        </WCol>
                    </WRow>
                </div>
                <div className="region-viewer-main">
                    Region Capital: {props.activeRegion.capital}
                </div>
                <div className="region-viewer-main">
                    Region Leader: {props.activeRegion.leader}
                </div>
                <div className="region-viewer-main">
                    # of Sub Regions: {props.activeRegion.subregions.length}
                </div>
            </WCol>
            <WCol size="4">
                <div className="landmarks-header">
                    Region Landmarks:
                </div>
                <WMMain className="landmarks-list">
                    <LandmarkList
                        activeRegion={props.activeRegion} updateRegionField={props.updateRegionField}
                    />
                </WMMain>
                    <WRow>
                        <WCol size="1">
                            <WButton className="add-landmark" onClick={() => props.updateRegionField(props.activeRegion._id,"add_landmark",landmarkName)}>
                                +
                            </WButton>
                        </WCol>
                        <WCol size="7">
                            <WInput className="landmarks-input" inputClass="landmarks-name" name='landmarkName' wType="filled" onBlur={handleNaming} autoFocus={true} defaultValue={landmarkName}/>
                        </WCol>
                        <WCol size="4">
                            <div className="landmarks-footer">
                                &nbsp;
                            </div>
                        </WCol>
                    </WRow>
            </WCol>
            <WCol size="2">

            </WCol>
        </WRow>
    </WLayout>
    );
}

export default RegionViewer;