'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class StatusChanged_Transaction extends jsTPS_Transaction {
    constructor(initModel,itemId) {
        super();
        this.model = initModel;
        this.id = itemId;
        this.changedStatus = document.getElementById("status-input-"+this.id).getAttribute("value");
    }

    doTransaction() {
        // MAKE A NEW ITEM
        this.statusChanged = document.getElementById("status-input-"+this.id).getAttribute("value");
        if(this.statusChanged!=this.changedStatus){
           this.model.currentList.getItemById(this.id).setStatus(this.changedStatus);
            this.model.view.viewList(this.model.currentList);
           }
    }

    undoTransaction() {
        this.model.view.viewList(this.model.currentList);
        this.changedStatus = document.getElementById("status-input-"+this.id).getAttribute("value");
        console.log(this.changedStatus);
            this.model.currentList.getItemById(this.id).setStatus(this.statusChanged);
        this.model.view.viewList(this.model.currentList);
        document.getElementById("redo-button").setAttribute("name","enabled");
    }
}