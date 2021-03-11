'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "./common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class DeleteList_Transaction extends jsTPS_Transaction {
    constructor(initApp) {
        super();
        this.app = initApp;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        this.listDeleted = this.app.deleteList();
    }

    undoTransaction() {
        let allLists = this.app.state.toDoLists;
        allLists.push(this.listDeleted);
        this.app.setState({
        toDoLists: this.app.state.toDoLists,
        currentList: this.listDeleted,
        toDoLists: allLists,
        nextListId: this.app.state.nextListId
        },this.afterToDoListsChangeComplete);
        this.app.loadToDoList(this.listDeleted);
    }
}