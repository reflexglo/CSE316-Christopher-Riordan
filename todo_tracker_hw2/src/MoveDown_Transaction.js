'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "./common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class DeleteList_Transaction extends jsTPS_Transaction {
    constructor(initApp,thisItem) {
        super();
        this.app = initApp;
        this.item = thisItem;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        this.app.moveDown(this.item);
    }

    undoTransaction() {
        this.app.moveUp(this.item);
    }
}