'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class TaskChanged_Transaction extends jsTPS_Transaction {
    constructor(initModel,itemId) {
        super();
        this.model = initModel;
        this.id = itemId;
        this.changedTask = document.getElementById("task-input-"+this.id).getAttribute("value");
    }

    doTransaction() {
        // MAKE A NEW ITEM
        this.taskChanged = document.getElementById("task-input-"+this.id).getAttribute("value");
        if(this.taskChanged!=this.changedTask){
           this.model.currentList.getItemById(this.id).setDescription(this.changedTask);
            this.model.view.viewList(this.model.currentList);
           }
    }

    undoTransaction() {
        this.model.view.viewList(this.model.currentList);
        this.changedTask = document.getElementById("task-input-"+this.id).getAttribute("value");
        console.log(this.changedTask);
            this.model.currentList.getItemById(this.id).setDescription(this.taskChanged);
        this.model.view.viewList(this.model.currentList);
        document.getElementById("redo-button").setAttribute("name","enabled");
    }
}