'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class MoveItemDown_Transaction extends jsTPS_Transaction {
    constructor(initModel,itemId) {
        super();
        this.model = initModel;
        this.id = itemId;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        if(document.getElementById("todo-list-item-"+this.id).nextSibling!=null){
           document.getElementById("todo-list-item-"+this.id).before(document.getElementById("todo-list-item-"+this.id).nextSibling);
            let index = this.model.currentList.getIndexOfItem(this.model.currentList.getItemById(this.id));
            let temp = this.model.currentList.items[index+1];
            this.model.currentList.items[index+1] = this.model.currentList.getItemById(this.id);
            this.model.currentList.items[index] = temp;
           }
        
    }

    undoTransaction() {
            document.getElementById("todo-list-item-"+this.id).after(document.getElementById("todo-list-item-"+this.id).previousSibling);
            let index = this.model.currentList.getIndexOfItem(this.model.currentList.getItemById(this.id));
            let temp = this.model.currentList.items[index-1];
            this.model.currentList.items[index-1] = this.model.currentList.getItemById(this.id);
            this.model.currentList.items[index] = temp;
        document.getElementById("redo-button").setAttribute("name","enabled");
    }
}