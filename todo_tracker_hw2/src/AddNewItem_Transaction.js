'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "./common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class AddNewItem_Transaction extends jsTPS_Transaction {
    constructor(initApp) {
        super();
        this.app = initApp;
    }

    doTransaction() {
        this.itemAdded = this.app.addNewItem();
    }

    undoTransaction() {
        let thisList = this.app.state.currentList;
        let ind = thisList.items.indexOf(this.itemAdded);
        thisList.items.splice(ind,1);
        this.app.setState({
        toDoLists: this.app.state.toDoLists,
        currentList: thisList,
        nextListId: this.app.state.nextListId
        },this.afterToDoListsChangeComplete);
    }
}