import React                            from 'react';
import LandmarkEntry                    from '../regionviewer/LandmarkEntry'

const LandmarkList = (props) => {
    const landmarkList = props.activeRegion.landmarks;
    return(
        <>
            {
                landmarkList && landmarkList.map((landmark,index) => (
                    <LandmarkEntry
                        landmark={landmark} updateRegionField={props.updateRegionField}
                        index={index} activeRegion={props.activeRegion}
                    />
                ))
            }
        </>
    );
}

export default LandmarkList;