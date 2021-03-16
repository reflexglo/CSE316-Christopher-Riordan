'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "./common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangeStatus_Transaction extends jsTPS_Transaction {
    constructor(initApp,thisItem,thisNewStatus,thisOldStatus) {
        super();
        this.app = initApp;
        this.item = thisItem;
        this.newStatus = thisNewStatus;
        this.oldStatus = thisOldStatus;
    }

    doTransaction() {
        let thisList = this.app.state.currentList;
        let index = thisList.items.indexOf(this.item);
        thisList.items[index].status = this.newStatus;
        console.log(thisList.items[index].status);
        this.app.setState({
            toDoLists: this.app.state.toDoLists,
            currentList: thisList,
            nextListId: this.app.state.nextListId
            },this.afterToDoListsChangeComplete);
    }

    undoTransaction() {
        let thisList = this.app.state.currentList;
        let index = thisList.items.indexOf(this.item);
        thisList.items[index].status = this.oldStatus;
        console.log(thisList.items[index].status);
        this.app.setState({
            toDoLists: this.app.state.toDoLists,
            currentList: thisList,
            nextListId: this.app.state.nextListId
            },this.afterToDoListsChangeComplete);
    }
}