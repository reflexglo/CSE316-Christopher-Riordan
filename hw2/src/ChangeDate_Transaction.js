'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "./common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangeDate_Transaction extends jsTPS_Transaction {
    constructor(initApp,thisItem,thisNewDate,thisOldDate) {
        super();
        this.app = initApp;
        this.item = thisItem;
        this.newDate = thisNewDate;
        this.oldDate = thisOldDate;
    }

    doTransaction() {
        let thisList = this.app.state.currentList;
        let index = thisList.items.indexOf(this.item);
        thisList.items[index].due_date = this.newDate;
        console.log(thisList.items[index].due_date);
        this.app.setState({
            toDoLists: this.app.state.toDoLists,
            currentList: thisList,
            nextListId: this.app.state.nextListId
            },this.afterToDoListsChangeComplete);
    }

    undoTransaction() {
        let thisList = this.app.state.currentList;
        let index = thisList.items.indexOf(this.item);
        thisList.items[index].due_date = this.oldDate;
        console.log(thisList.items[index].due_date);
        this.app.setState({
            toDoLists: this.app.state.toDoLists,
            currentList: thisList,
            nextListId: this.app.state.nextListId
            },this.afterToDoListsChangeComplete);
    }
}