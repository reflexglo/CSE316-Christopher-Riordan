import React                            from 'react';
import LandmarkEntry                    from '../regionviewer/LandmarkEntry'

const LandmarkList = (props) => {
    const landmarkList = props.activeRegion.landmarks;
    const subLandmarkList = props.subLandmarkList;
    

    return(
        <>
            {
                landmarkList && landmarkList.map((landmark,index) => (
                    <LandmarkEntry
                        landmark={landmark} updateRegionField={props.updateRegionField}
                        index={index} activeRegion={props.activeRegion}
                        setDeleting={props.setDeleting} setLandLength={props.setLandLength}
                        landmarkList={landmarkList} setEditing={props.setEditing} setChange={props.setChange}
                        removeLandmark={props.removeLandmark} isSub={false}
                    />
                ))
            }
            {
                subLandmarkList && subLandmarkList.map((landmark,index) =>(
                    <LandmarkEntry
                        landmark={landmark} updateRegionField={props.updateRegionField}
                        index={index} activeRegion={props.activeRegion}
                        setDeleting={props.setDeleting} setLandLength={props.setLandLength}
                        landmarkList={landmarkList} setEditing={props.setEditing} setChange={props.setChange}
                        removeLandmark={props.removeLandmark} isSub={true}
                    />
                ))
            }
        </>
    );
}

export default LandmarkList;