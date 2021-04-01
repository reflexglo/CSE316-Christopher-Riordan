import React from 'react';

import { WButton, WRow, WCol } from 'wt-frontend';

const TableHeader = (props) => {

    const buttonStyle = props.disabled ? ' table-header-button-disabled ' : 'table-header-button ';
    const redoStyle = props.hasRedo  ? buttonStyle+"has-undo-redo" : buttonStyle+'not-undo-redo';
    const undoStyle = props.hasUndo  ? buttonStyle+"has-undo-redo" : buttonStyle+'not-undo-redo';
    const clickDisabled = () => { };

    return (
        <WRow className="table-header">
            <WCol size="3">
                <WButton className='table-header-section' wType="texted" onClick={props.sortByTask}>Task</WButton>
            </WCol>

            <WCol size="2">
                <WButton className='table-header-section' wType="texted" onClick={props.sortByDate}>Due Date</WButton>
            </WCol>

            <WCol size="2">
                <WButton className='table-header-section' wType="texted" onClick={props.sortByStatus}>Status</WButton>
            </WCol>
            <WCol size="2">
                <WButton className='table-header-section' wType="texted" onClick={props.sortByAssign}>Assigned To</WButton>
            </WCol>
            <WCol size="2">
                <div className="table-header-buttons">
                <WButton className={`${undoStyle}`} onClick={props.undo} wType="texted" clickAnimation="ripple-light" shape="rounded">
                            <i className="material-icons">undo</i>
                        </WButton>
                <WButton className={`${redoStyle}`} onClick={props.redo} wType="texted" clickAnimation="ripple-light" shape="rounded">
                            <i className="material-icons">redo</i>
                        </WButton>
                        <WButton onClick={props.disabled ? clickDisabled : props.addItem} wType="texted" className={`${buttonStyle}`}>
                        <i className="material-icons">add_box</i>
                    </WButton>
                    <WButton onClick={props.disabled ? clickDisabled : props.setShowDelete} wType="texted" className={`${buttonStyle}`}>
                        <i className="material-icons">delete_outline</i>
                    </WButton>
                    <WButton onClick={props.disabled ? clickDisabled : () => props.closeList()} wType="texted" className={`${buttonStyle}`}>
                        <i className="material-icons">close</i>
                    </WButton>
                </div>
            </WCol>

        </WRow>
    );
};

export default TableHeader;