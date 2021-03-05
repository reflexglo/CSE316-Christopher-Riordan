'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class dateChanged_Transaction extends jsTPS_Transaction {
    constructor(initModel,itemId) {
        super();
        this.model = initModel;
        this.id = itemId;
        this.changedDate = document.getElementById("date-input-"+this.id).getAttribute("value");
    }

    doTransaction() {
        // MAKE A NEW ITEM
        this.dateChanged = document.getElementById("date-input-"+this.id).getAttribute("value");
        if(this.dateChanged!=this.changedDate){
           this.model.currentList.getItemById(this.id).setDueDate(this.changedDate);
            this.model.view.viewList(this.model.currentList);
           }
    }

    undoTransaction() {
        this.model.view.viewList(this.model.currentList);
        this.changedDate = document.getElementById("date-input-"+this.id).getAttribute("value");
        console.log(this.changedDate);
            this.model.currentList.getItemById(this.id).setDueDate(this.dateChanged);
        this.model.view.viewList(this.model.currentList);
        document.getElementById("redo-button").setAttribute("name","enabled");
    }
}