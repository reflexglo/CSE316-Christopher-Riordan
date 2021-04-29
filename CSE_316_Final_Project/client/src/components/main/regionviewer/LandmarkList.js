import React                            from 'react';
import LandmarkEntry                    from '../regionviewer/LandmarkEntry'

const LandmarkList = (props) => {
    const landmarkList = props.activeRegion.landmarks;
    return(
        <>
            {
                landmarkList && landmarkList.map(landmark => (
                    <LandmarkEntry
                        landmark={landmark}
                    />
                ))
            }
        </>
    );
}

export default LandmarkList;