import React, { useState }                            from 'react';
import { WNavItem, WInput } from 'wt-frontend';
import WButton from 'wt-frontend/build/components/wbutton/WButton';
import WCol from 'wt-frontend/build/components/wgrid/WCol';
import WRow from 'wt-frontend/build/components/wgrid/WRow';
import icon from './trashicon.png';

const MapEntry = (props) => {
    const [editing, toggleEditing] = useState(false);
    const [preEdit, setPreEdit] = useState(props.name);
    const activeStyle = props.isActive ? "active-text" : "map-text";

    const handleEditing = (e) => {
        e.stopPropagation();
        setPreEdit(props.name);
        toggleEditing(!editing);
    };

    const handleSubmit = (e) => {
        handleEditing(e);
        const { name, value } = e.target;
        props.updateMapField(props._id, name, value, preEdit);
    };

    return(
        <WNavItem
            onDoubleClick={handleEditing} onClick={() => props.setActiveMap(props.map)}
        >
            {
                editing ? 
                <WRow>
                    <WCol size="10">
                        <WInput className="list-item-edit" inputClass="list-item-edit-input" wType="lined" barAnimation="solid" name='name' onBlur={handleSubmit} autoFocus={true} defaultValue={props.name} color="black"/>
                    </WCol>
                    <WCol size="2">
                        <WButton className="delete-map" onClick={() => props.setShowDelete(true,props._id)}>
                            <img className="trash-icon" src={icon}></img>
                        </WButton>
                    </WCol>
                </WRow>
                
                    :   
                    <WRow>
                        <WCol size="10">
                            <div className={activeStyle}>
                                {props.name}
                            </div>
                        </WCol>
                        <WCol size="2">
                            <WButton className="delete-map" onClick={() => props.setShowDelete(true,props._id)}>
                                <img className="trash-icon" src={icon}></img>
                            </WButton>
                        </WCol>
                    </WRow>
            }
        </WNavItem>
    );
}

export default MapEntry;