'use strict'

/**
 * ToDoController
 * 
 * This class serves as the event traffic manager, routing all
 * event handling responses.
 */
export default class ToDoController {    
    constructor() {}

    setModel(initModel) {
        this.model = initModel;
        let appModel = this.model;

        // SETUP ALL THE EVENT HANDLERS SINCE THEY USE THE MODEL
        document.getElementById("add-list-button").onmousedown = function() {
            appModel.addNewList();
        }
        document.getElementById("undo-button").onmousedown = function() {
            appModel.undo();
        }
        document.getElementById("redo-button").onmousedown = function() {
            appModel.redo();
        }
        document.getElementById("delete-list-button").onmousedown = function() {
            appModel.confirmDelete();
        }
        document.getElementById("add-item-button").onmousedown = function() {
            appModel.addNewItemTransaction();
        }  
    }
    setUpControls(){
        let appModel = this.model;
        for(let setItem of appModel.currentList.items){
            document.getElementById("task-input-"+setItem.getId()).onmousedown = appModel.moveItemUpTransaction(setItem.getId());
        }
    }
    saveItemInfo(appModel){
        if(appModel.currentList!=null){
        for(let savedItem of appModel.currentList.items){
            savedItem.setDescription(document.getElementById("task-input-"+savedItem.getId()).value);
            savedItem.setDueDate(document.getElementById("date-input-"+savedItem.getId()).value);
            savedItem.setStatus(document.getElementById("status-input-"+savedItem.getId()).value);
        }
    }
    }
    // PROVIDES THE RESPONSE TO WHEN A USER CLICKS ON A LIST TO LOAD
    handleLoadList(listId) {
        // UNLOAD THE CURRENT LIST AND INSTEAD LOAD THE CURRENT LIST
        let appModel = this.model;
        this.saveItemInfo(appModel);
        appModel.loadList(listId);
        document.getElementById("add-list-button").setAttribute("name","disabled");
        document.getElementById("add-item-button").setAttribute("name","enabled");
        document.getElementById("delete-list-button").setAttribute("name","enabled");
        document.getElementById("close-list-button").setAttribute("name","enabled");
        document.getElementById("close-list-button").onclick = function(){appModel.closeList();};
        document.getElementById("todo-lists-list").children.item(0).before(document.getElementById("todo-list-"+listId));
    }
}