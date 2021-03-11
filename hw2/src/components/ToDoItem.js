// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Close from '@material-ui/icons/Close';
import TaskForm from './TaskForm'
import DateForm from './DateForm'
import StatusForm from './StatusForm'

class ToDoItem extends Component {
    constructor(props) {
        super(props);
        
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " constructor");
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " did mount");
    }
    moveThisItemUp = () => {
        this.props.moveUpItemCallBack(this.props.toDoListItem);
    }
    moveThisItemDown = () => {
        this.props.moveDownItemCallBack(this.props.toDoListItem);
    }
    closeItem = () => {
        this.props.closeItemCallBack(this.props.toDoListItem);
    }
    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem render");
        let listItem = this.props.toDoListItem;
        let statusType = "status-complete";
        if (listItem.status === "incomplete")
            statusType = "status-incomplete";
        if(this.props.index == 0){
            return (
                <div id={'todo-list-item-' + listItem.id} className='list-item-card'>
                    <TaskForm changeTaskCallBack={this.props.changeTaskCallBack} itemChanged={this.props.toDoListItem} task={listItem.description}></TaskForm>
                    <DateForm changeDateCallBack={this.props.changeDateCallBack} itemChanged={this.props.toDoListItem} date={listItem.due_date}></DateForm>
                    <StatusForm changeStatusCallBack={this.props.changeStatusCallBack} itemChanged={this.props.toDoListItem} status={listItem.status}></StatusForm>
                    <div className='item-col test-4-col'></div>
                    <div className='item-col list-controls-col'>
                        <KeyboardArrowDown className='list-item-control todo-button' onClick={this.moveThisItemDown}/>
                        <Close className='list-item-control todo-button' onClick={this.closeItem}/>
                        <div className='list-item-control'></div>
            <div className='list-item-control'></div>
                    </div>
                </div>
            )
        }
        else if(this.props.index==this.props.listLength-1){
            return (
                <div id={'todo-list-item-' + listItem.id} className='list-item-card'>
                    <TaskForm changeTaskCallBack={this.props.changeTaskCallBack} itemChanged={this.props.toDoListItem} task={listItem.description}></TaskForm>
                    <DateForm changeDateCallBack={this.props.changeDateCallBack} itemChanged={this.props.toDoListItem} date={listItem.due_date}></DateForm>
                    <StatusForm changeStatusCallBack={this.props.changeStatusCallBack} itemChanged={this.props.toDoListItem} status={listItem.status}></StatusForm>
                    <div className='item-col test-4-col'></div>
                    <div className='item-col list-controls-col'>
                        <KeyboardArrowUp className='list-item-control todo-button' onClick={this.moveThisItemUp}/>
                        <Close className='list-item-control todo-button' onClick={this.closeItem}/>
                        <div className='list-item-control'></div>
            <div className='list-item-control'></div>
                    </div>
                </div>
            )
        }
        else{
            return (
                <div id={'todo-list-item-' + listItem.id} className='list-item-card'>
                    <TaskForm changeTaskCallBack={this.props.changeTaskCallBack} itemChanged={this.props.toDoListItem} task={listItem.description}></TaskForm>
                    <DateForm changeDateCallBack={this.props.changeDateCallBack} itemChanged={this.props.toDoListItem} date={listItem.due_date}></DateForm>
                    <StatusForm changeStatusCallBack={this.props.changeStatusCallBack} itemChanged={this.props.toDoListItem} status={listItem.status}></StatusForm>
                    <div className='item-col test-4-col'></div>
                    <div className='item-col list-controls-col'>
                        <KeyboardArrowUp className='list-item-control todo-button' onClick={this.moveThisItemUp}/>
                        <KeyboardArrowDown className='list-item-control todo-button' onClick={this.moveThisItemDown}/>
                        <Close className='list-item-control todo-button' onClick={this.closeItem}/>
                        <div className='list-item-control'></div>
            <div className='list-item-control'></div>
                    </div>
                </div>
            )
        }
        
    }
}

export default ToDoItem;