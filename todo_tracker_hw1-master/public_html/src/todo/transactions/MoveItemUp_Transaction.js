'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class MoveItemUp_Transaction extends jsTPS_Transaction {
    constructor(initModel) {
        super();
        this.model = initModel;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        this.itemMoved = this.model.moveItemUp();
    }

    undoTransaction() {
        document.getElementById("todo-list-item-"+itemMoved.getId()).before(document.getElementById("todo-list-item-"+id).nextSibling());
    }
}