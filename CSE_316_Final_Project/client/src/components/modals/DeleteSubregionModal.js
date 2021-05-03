import React from 'react';

import { WModal, WMHeader, WMMain, WButton } from 'wt-frontend';

const DeleteSubregionModal = (props) => {

    const handleDelete = async () => {
        props.deleteSubregion(props.region_id);
        props.setShowDeleteSubregion(false,"");
    }

    return (
        // Replace div with WModal
        <WModal className="delete-modal" visible="true">
            <WMHeader className="modal-header" onClose={() => props.setShowDeleteSubregion(false,"")}>
                Delete Subregion?
			</WMHeader>

            <WMMain>
                <WButton className="modal-button cancel-button" onClick={() => props.setShowDeleteSubregion(false,"")} wType="texted">
                    Cancel
				</WButton>
                <label className="col-spacer">&nbsp;</label>
                <WButton className="modal-button" onClick={handleDelete} clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="danger">
                    Delete
				</WButton>
            </WMMain>

        </WModal>
    );
}

export default DeleteSubregionModal;