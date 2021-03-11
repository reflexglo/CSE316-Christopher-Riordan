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
        this.listClosed = this.app.closeList();
    }

    undoTransaction() {
        this.app.setState({
            currentList: this.listClosed
        },this.afterToDoListsChangeComplete);
    }
}