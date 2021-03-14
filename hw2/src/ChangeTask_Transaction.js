'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "./common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangeTask_Transaction extends jsTPS_Transaction {
    constructor(initApp,thisItem,thisNewTask,thisOldTask) {
        super();
        this.app = initApp;
        this.item = thisItem;
        this.newTask = thisNewTask;
        this.oldTask = thisOldTask;
    }

    doTransaction() {
        let thisList = this.app.state.currentList;
        let index = thisList.items.indexOf(this.item);
        thisList.items[index].description = this.newTask;
        console.log(thisList.items[index].description);
        this.app.setState({
            toDoLists: this.app.state.toDoLists,
            currentList: thisList,
            nextListId: this.app.state.nextListId
            },this.afterToDoListsChangeComplete);
    }

    undoTransaction() {
        let thisList = this.app.state.currentList;
        let index = thisList.items.indexOf(this.item);
        thisList.items[index].description = this.oldTask;
        console.log(thisList.items[index].description);
        this.app.setState({
            toDoLists: this.app.state.toDoLists,
            currentList: thisList,
            nextListId: this.app.state.nextListId
            },this.afterToDoListsChangeComplete);
    }
}