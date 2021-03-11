'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "./common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class AddNewList_Transaction extends jsTPS_Transaction {
    constructor(initApp) {
        super();
        this.app = initApp;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        this.listAdded = this.app.addNewList();
    }

    undoTransaction() {
        let allLists = this.app.state.toDoLists;
        let ind = allLists.indexOf(this.listAdded);
        allLists.splice(ind,1);
        this.app.setState({
        toDoLists: this.app.state.toDoLists,
        currentList: {items:[]},
        toDoLists: allLists,
        nextListId: this.app.state.nextListId
        },this.afterToDoListsChangeComplete);
    }
}