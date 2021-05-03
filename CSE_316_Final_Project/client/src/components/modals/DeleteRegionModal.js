import React from 'react';

import { WModal, WMHeader, WMMain, WButton } from 'wt-frontend';

const DeleteRegionModal = (props) => {

    const handleDelete = async () => {
        props.deleteRegion(props.region_id);
        props.setShowDeleteRegion(false,"");
    }

    return (
        // Replace div with WModal
        <WModal className="delete-modal" visible="true">
            <WMHeader className="modal-header" onClose={() => props.setShowDeleteRegion(false,"")}>
                Delete Region?
			</WMHeader>

            <WMMain>
                <WButton className="modal-button cancel-button" onClick={() => props.setShowDeleteRegion(false,"")} wType="texted">
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

export default DeleteRegionModal;