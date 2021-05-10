import React, {useState}                            from 'react';
import { WInput } from 'wt-frontend';
import WCol from 'wt-frontend/build/components/wgrid/WCol';
import WRow from 'wt-frontend/build/components/wgrid/WRow';

const LandmarkEntry = (props) => {

    const [editing, toggleEditing] = useState(false);

    const handleRenaming = (e) => {
        const { name, value } = e.target;
        let preEdit = props.landmark + "#" + props.index.toString();
        let newName = value + "#" + props.index.toString();
        props.updateRegionField(props.activeRegion._id,"update_landmark",newName,preEdit);
        toggleEditing(false);
        props.setEditing(true);
        props.setChange(value);
    }

    const handleDelete = () => {
        let index = props.index.toString();
        props.removeLandmark(index);
        props.setDeleting(true);
        props.setLandLength(props.landmarkList.length-1);
    }

    return(
        <>
        {
            props.isSub ?
                <WRow>
                <WCol size="1">

                </WCol>
                <WCol size="11">
                {
                    <div className="landmark-subentry">
                        {props.landmark}
                    </div>
                }
                </WCol>
            </WRow>
            :
            <WRow>
                <WCol size="1">
                <div className="remove-landmark" onClick={handleDelete}>
                    X
                </div>
                </WCol>
                <WCol size="11">
                {
                    !editing ?
                    <div className="landmark-entry" onClick={() => toggleEditing(true)}>
                        {props.landmark}
                    </div>
                    :
                    <WInput className="list-item-edit" inputClass="list-item-edit-input" wType="lined" name='name' onBlur={handleRenaming} autoFocus={true} defaultValue={props.landmark} color="black"/>
                }
                </WCol>
            </WRow>
        }
        </>
    );
}

export default LandmarkEntry;