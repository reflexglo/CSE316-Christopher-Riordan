// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import ToDoItem from './ToDoItem'
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import AddBox from '@material-ui/icons/AddBox';
import Delete from '@material-ui/icons/Delete';
import Close from '@material-ui/icons/Close';
import Hotkeys from 'react-hot-keys';

class Workspace extends Component {
    constructor(props) {
        super(props);
    }
    undoShortCut = () => {
        this.props.undoCallBack();
        this.forceUpdate();
    }
    redoShortCut = () => {
        this.props.redoCallBack();
        this.forceUpdate();
    }
    render() {
        if(this.props.currentToDoList.id!=undefined){
            return (
                <div id="workspace">
                    <div id="todo-list-header-card" className="list-item-card">
                        <div id="task-col-header" className="item-col todo-button">Task</div>
                        <div id="date-col-header" className="item-col todo-button">Due Date</div>
                        <div id="status-col-header" className="item-col todo-button">Status</div>
                        <div className="item-col" display="flex" flexDirection="row" flexWrap="nowrap">
                            <Hotkeys 
                                keyName="ctrl+z" 
                                onKeyDown={this.undoShortCut}
                            >
                            </Hotkeys>
                            <Hotkeys 
                                keyName="ctrl+y" 
                                onKeyDown={this.redoShortCut}
                            >
                            </Hotkeys>
                            <Undo value={this.props.undoStatus()} id="undo-button" className="material-icons" onClick={this.props.undoCallBack}/>
                            <Redo value={this.props.redoStatus()} id="redo-button" className="material-icons" onClick={this.props.redoCallBack}/>
                            <AddBox id="add-item-button" className="list-item-control material-icons todo-button" onClick={this.props.addNewItemCallBack}/>
                            <Delete id="delete-list-button" className="list-item-control material-icons todo-button" onClick={this.props.deleteListCallBack}/>
                            <Close id="close-list-button" className="list-item-control material-icons todo-button" onClick={this.props.closeListCallBack}/>
                        </div>
                    </div>
                    <div id="todo-list-items-div">
                    {
                        this.props.toDoListItems.map((toDoListItem) => (
                        <ToDoItem
                            index={this.props.toDoListItems.indexOf(toDoListItem)}
                            listLength={this.props.toDoListItems.length}
                            key={toDoListItem.id}
                            toDoListItem={toDoListItem}     // PASS THE ITEM TO THE CHILDREN
                            moveUpItemCallBack={this.props.moveUpItemCallBack}
                            moveDownItemCallBack={this.props.moveDownItemCallBack}
                            closeItemCallBack={this.props.closeItemCallBack}
                            changeTaskCallBack={this.props.changeTaskCallBack}
                            changeDateCallBack={this.props.changeDateCallBack}
                            changeStatusCallBack={this.props.changeStatusCallBack}
                        />))
                    }
                </div>
                <br />
            </div>
        );
        }
        else{
            return (
                <div id="workspace">
                    <div id="todo-list-header-card" className="list-item-card">
                        <div id="task-col-header" className="item-col todo-button">Task</div>
                        <div id="date-col-header" className="item-col todo-button">Due Date</div>
                        <div id="status-col-header" className="item-col todo-button">Status</div>
                        <div className="item-col" display="flex" flexDirection="row" flexWrap="nowrap">
                        </div>
                    </div>
                    <div id="todo-list-items-div">
                    {
                        this.props.toDoListItems.map((toDoListItem) => (
                        <ToDoItem
                            index={this.props.toDoListItems.indexOf(toDoListItem)}
                            listLength={this.props.toDoListItems.length}
                            key={toDoListItem.id}
                            toDoListItem={toDoListItem}     // PASS THE ITEM TO THE CHILDREN
                            moveUpItemCallBack={this.props.moveUpItemCallBack}
                            moveDownItemCallBack={this.props.moveDownItemCallBack}
                            closeItemCallBack={this.props.closeItemCallBack}
                            changeTaskCallBack={this.props.changeTaskCallBack}
                            changeDateCallBack={this.props.changeDateCallBack}
                            changeStatusCallBack={this.props.changeStatusCallBack}
                        />))
                    }
                </div>
                <br />
            </div>
        );
        }
        
                
    }
}

export default Workspace;