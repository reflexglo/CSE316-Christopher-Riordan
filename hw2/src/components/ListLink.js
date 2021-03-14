// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import ListTitle from './ListTitle'

class ListLink extends Component {
    constructor(props) {
        super(props);
        
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " constructor");
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " did mount");
    }

    handleLoadList = () => {
        this.props.loadToDoListCallback(this.props.toDoList);
    }

    render() {
        // DISPLAY WHERE WE ARE
        if(this.props.selectedList == this.props.toDoList){
            return (
                <ListTitle 
                    className='todo-list-title'
                    title={this.props.toDoList.name}
                    changeTitle={this.props.changeListTitleCallBack}
                >
                    {this.props.toDoList.name}<br />
                </ListTitle>
            )
        }
        else{
            return (
                <div 
                    className='todo-list-button'
                    onClick={this.handleLoadList}
                >
                    {this.props.toDoList.name}<br />
                </div>
            )
        }
        
    }
}

export default ListLink;