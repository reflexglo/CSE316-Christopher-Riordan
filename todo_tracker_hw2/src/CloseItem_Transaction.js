'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "./common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class CloseItem_Transaction extends jsTPS_Transaction {
    constructor(initApp,thisItem) {
        super();
        this.app = initApp;
        this.item = thisItem;
    }

    doTransaction() {
        this.index = this.app.closeItem(this.item);
    }

    undoTransaction() {
        let thisList = this.app.state.currentList;
        thisList.items.splice(this.index,0,this.item);
        this.app.setState({
        toDoLists: this.app.state.toDoLists,
        currentList: thisList,
        nextListId: this.app.state.nextListId
        },this.afterToDoListsChangeComplete);
    }
}