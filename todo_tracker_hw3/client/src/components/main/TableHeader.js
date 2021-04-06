import React from 'react';
import Hotkeys from 'react-hot-keys';

import { WButton, WRow, WCol } from 'wt-frontend';

const TableHeader = (props) => {

    const buttonStyle = props.disabled ? ' table-header-button-disabled ' : 'table-header-button ';
    const doStyle = props.disabled ? ' table-header-button-disabled ' : ' do-header-button ';
    const divStyle = props.disabled ? 'table-header-buttons' : 'do-header-buttons';
    const redoStyle = props.hasRedo  ? doStyle+"has-undo-redo" : doStyle+'not-undo-redo';
    const undoStyle = props.hasUndo  ? doStyle+"has-undo-redo" : doStyle+'not-undo-redo';
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
            <div className={`${divStyle}`}>
                <Hotkeys 
                                keyName="ctrl+z" 
                                onKeyDown={props.undo}
                            >
                </Hotkeys>
                <Hotkeys 
                                keyName="ctrl+y" 
                                onKeyDown={props.redo}
                            >
                </Hotkeys>
                <WButton className={`${undoStyle}`} onClick={props.undo} wType="texted" clickAnimation="ripple-light" shape="rounded">
                            <i className="material-icons">undo</i>
                        </WButton>
                <WButton className={`${redoStyle}`} onClick={props.redo} wType="texted" clickAnimation="ripple-light" shape="rounded">
                            <i className="material-icons">redo</i>
                        </WButton>
            </div>
                <div className="table-header-buttons">
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