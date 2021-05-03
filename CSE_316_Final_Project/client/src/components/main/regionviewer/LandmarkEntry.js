import React                            from 'react';
import WCol from 'wt-frontend/build/components/wgrid/WCol';
import WRow from 'wt-frontend/build/components/wgrid/WRow';

const LandmarkEntry = (props) => {

    const handleDelete = () => {
        let index = props.index.toString();
        props.updateRegionField(props.activeRegion._id,"delete_landmark",index);
    }

    return(
        <>
            <WRow>
                <WCol size="1">
                <div className="remove-landmark" onClick={handleDelete}>
                    X
                </div>
                </WCol>
                <WCol size="1">
                <div className="landmark-entry">
                    {props.landmark}
                </div>
                </WCol>
            </WRow>
        </>
    );
}

export default LandmarkEntry;