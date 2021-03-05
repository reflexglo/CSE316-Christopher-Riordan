'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class CloseItem_Transaction extends jsTPS_Transaction {
    constructor(initModel,itemId) {
        super();
        this.model = initModel;
        this.id = itemId;
    }

    doTransaction() {
        // MAKE A NEW ITEM
            this.itemRemoved = document.getElementById("todo-list-item-"+this.id);
            this.afterItemRemoved = null;
        if(document.getElementById("todo-list-item-"+this.id).nextSibling!=null){
           this.afterItemRemoved = document.getElementById("todo-list-item-"+this.id).nextSibling.getAttribute("id");
           }
            document.getElementById("todo-list-items-div").removeChild(this.itemRemoved);
            this.thisItem = this.model.currentList.getItemById(this.id);
            this.index = this.model.currentList.getIndexOfItem(this.thisItem);
            this.afterItem = null;
            if(this.afterItemRemoved!=null){
                this.afterItem = this.model.currentList.items[this.model.currentList.getIndexOfItem(this.thisItem)+1];
            }
        this.model.removeItem(this.thisItem);
    }

    undoTransaction() {
            
            if(this.afterItemRemoved!=null){
                this.model.currentList.addItemBefore(this.index,this.thisItem);
               document.getElementById("todo-list-items-div").insertBefore(this.itemRemoved,document.getElementById(this.afterItemRemoved));
               }
        else{
            this.model.currentList.addItem(this.thisItem);
            document.getElementById("todo-list-items-div").append(this.itemRemoved);
            document.getElementById("redo-button").setAttribute("name","enabled");
        }
    }
}