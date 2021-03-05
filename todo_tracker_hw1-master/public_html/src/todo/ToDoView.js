'use strict'

/**
 * ToDoView
 * 
 * This class generates all HTML content for the UI.
 */
export default class ToDoView {
    constructor() {}

    // ADDS A LIST TO SELECT FROM IN THE LEFT SIDEBAR
    appendNewListToView(newList) {
        // GET THE UI CONTROL WE WILL APPEND IT TO
        let listsElement = document.getElementById("todo-lists-list");

        // MAKE AND ADD THE NODE
        let newListId = "todo-list-" + newList.id;
        let listElement = document.createElement("div");
        listElement.setAttribute("id", newListId);
        listElement.setAttribute("class", "todo_button");
        listElement.appendChild(document.createTextNode(newList.name));
        listsElement.appendChild(listElement);

        // SETUP THE HANDLER FOR WHEN SOMEONE MOUSE CLICKS ON OUR LIST
        let thisController = this.controller;
        listElement.onmousedown = function() {
            thisController.handleLoadList(newList.id);
        }
    }

    // REMOVES ALL THE LISTS FROM THE LEFT SIDEBAR
    clearItemsList() {
        let itemsListDiv = document.getElementById("todo-list-items-div");
        // BUT FIRST WE MUST CLEAR THE WORKSPACE OF ALL CARDS BUT THE FIRST, WHICH IS THE ITEMS TABLE HEADER
        let parent = itemsListDiv;
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    // REFRESHES ALL THE LISTS IN THE LEFT SIDEBAR
    refreshLists(lists) {
        // GET THE UI CONTROL WE WILL APPEND IT TO
        let listsElement = document.getElementById("todo-lists-list");
        listsElement.innerHTML = "";

        for (let i = 0; i < lists.length; i++) {
            let list = lists[i];
            this.appendNewListToView(list);
        }
    }
    // LOADS THE list ARGUMENT'S ITEMS INTO THE VIEW
    viewList(list) {
        // WE'LL BE ADDING THE LIST ITEMS TO OUR WORKSPACE
        let itemsListDiv = document.getElementById("todo-list-items-div");

        // GET RID OF ALL THE ITEMS
        this.clearItemsList();

        for (let i = 0; i < list.items.length; i++) {
            // NOW BUILD ALL THE LIST ITEMS
            let listItem = list.items[i];
            let listItemElement = "";
            if(listItem.getStatus()=="complete"){
               if(i == 0){
               listItemElement = "<div id='todo-list-item-" + listItem.id + "' class='list-item-card' name='item'>"
                                + "<div class='task-col'><input type='text' id='task-input-"+listItem.id+"' name='task-input' value='"+listItem.description+"'></div>"
                                + "<div class='due-date-col'><input type='date' id='date-input-"+listItem.id+"' name='date-input' value='"+listItem.dueDate+"'></div>"
                                + "<div class='status-col'><select id='status-input-"+listItem.id+"' name='status-input' value='"+listItem.status+"'><option value='complete'>complete</option><option value='incomplete'>incomplete</option></select></div>"
                                + "<div class='list-controls-col'>"
                                + " <div value='disabled' name='up-arrow' id='up-arrow-"+listItem.id+"' class='list-item-control material-icons'>keyboard_arrow_up</div>"
                                + " <div value='enabled' name='down-arrow' id='down-arrow-"+listItem.id+"' class='list-item-control material-icons'>keyboard_arrow_down</div>"
                                + " <div name='close-item' id='close-item-"+listItem.id+"' class='list-item-control material-icons'>close</div>"
                                + " <div class='list-item-control'></div>"
                                + " <div class='list-item-control'></div>"
                                + "</div>";
               }
            else if(i == list.items.length-1){
                    listItemElement = "<div id='todo-list-item-" + listItem.id + "' class='list-item-card' name='item'>"
                                + "<div class='task-col'><input type='text' id='task-input-"+listItem.id+"' name='task-input' value='"+listItem.description+"'></div>"
                                + "<div class='due-date-col'><input type='date' id='date-input-"+listItem.id+"' name='date-input' value='"+listItem.dueDate+"'></div>"
                                + "<div class='status-col'><select id='status-input-"+listItem.id+"' name='status-input' value='"+listItem.status+"'><option value='complete'>complete</option><option value='incomplete'>incomplete</option></select></div>"
                                + "<div class='list-controls-col'>"
                                + " <div value='enabled' name='up-arrow' id='up-arrow-"+listItem.id+"' class='list-item-control material-icons'>keyboard_arrow_up</div>"
                                + " <div value='disabled' name='down-arrow' id='down-arrow-"+listItem.id+"' class='list-item-control material-icons'>keyboard_arrow_down</div>"
                                + " <div name='close-item' id='close-item-"+listItem.id+"' class='list-item-control material-icons'>close</div>"
                                + " <div class='list-item-control'></div>"
                                + " <div class='list-item-control'></div>"
                                + "</div>";
                    }
            else{
                listItemElement = "<div id='todo-list-item-" + listItem.id + "' class='list-item-card' name='item'>"
                                + "<div class='task-col'><input type='text' id='task-input-"+listItem.id+"' name='task-input' value='"+listItem.description+"'></div>"
                                + "<div class='due-date-col'><input type='date' id='date-input-"+listItem.id+"' name='date-input' value='"+listItem.dueDate+"'></div>"
                                + "<div class='status-col'><select id='status-input-"+listItem.id+"' name='status-input' value='"+listItem.status+"'><option value='complete'>complete</option><option value='incomplete'>incomplete</option></select></div>"
                                + "<div class='list-controls-col'>"
                                + " <div value='enabled' name='up-arrow' id='up-arrow-"+listItem.id+"' class='list-item-control material-icons'>keyboard_arrow_up</div>"
                                + " <div value='enabled' name='down-arrow' id='down-arrow-"+listItem.id+"' class='list-item-control material-icons'>keyboard_arrow_down</div>"
                                + " <div name='close-item' id='close-item-"+listItem.id+"' class='list-item-control material-icons'>close</div>"
                                + " <div class='list-item-control'></div>"
                                + " <div class='list-item-control'></div>"
                                + "</div>";
            }
               }
            else{
                if(i == 0){
               listItemElement = "<div id='todo-list-item-" + listItem.id + "' class='list-item-card' name='item'>"
                                + "<div class='task-col'><input type='text' id='task-input-"+listItem.id+"' name='task-input' value='"+listItem.description+"'></div>"
                                + "<div class='due-date-col'><input type='date' id='date-input-"+listItem.id+"' name='date-input' value='"+listItem.dueDate+"'></div>"
                                + "<div class='status-col'><select id='status-input-"+listItem.id+"' name='status-input' value='"+listItem.status+"'><option value='incomplete'>incomplete</option><option value='complete'>complete</option></select></div>"
                                + "<div class='list-controls-col'>"
                                + " <div value='disabled' name='up-arrow' id='up-arrow-"+listItem.id+"' class='list-item-control material-icons'>keyboard_arrow_up</div>"
                                + " <div value='enabled' name='down-arrow' id='down-arrow-"+listItem.id+"' class='list-item-control material-icons'>keyboard_arrow_down</div>"
                                + " <div name='close-item' id='close-item-"+listItem.id+"' class='list-item-control material-icons'>close</div>"
                                + " <div class='list-item-control'></div>"
                                + " <div class='list-item-control'></div>"
                                + "</div>";
               }
            else if(i == list.items.length-1){
                    listItemElement = "<div id='todo-list-item-" + listItem.id + "' class='list-item-card' name='item'>"
                                + "<div class='task-col'><input type='text' id='task-input-"+listItem.id+"' name='task-input' value='"+listItem.description+"'></div>"
                                + "<div class='due-date-col'><input type='date' id='date-input-"+listItem.id+"' name='date-input' value='"+listItem.dueDate+"'></div>"
                                + "<div class='status-col'><select id='status-input-"+listItem.id+"' name='status-input' value='"+listItem.status+"'><option value='incomplete'>incomplete</option><option value='complete'>complete</option></select></div>"
                                + "<div class='list-controls-col'>"
                                + " <div value='enabled' name='up-arrow' id='up-arrow-"+listItem.id+"' class='list-item-control material-icons'>keyboard_arrow_up</div>"
                                + " <div value='disabled' name='down-arrow' id='down-arrow-"+listItem.id+"' class='list-item-control material-icons'>keyboard_arrow_down</div>"
                                + " <div name='close-item' id='close-item-"+listItem.id+"' class='list-item-control material-icons'>close</div>"
                                + " <div class='list-item-control'></div>"
                                + " <div class='list-item-control'></div>"
                                + "</div>";
                    }
            else{
                listItemElement = "<div id='todo-list-item-" + listItem.id + "' class='list-item-card' name='item'>"
                                + "<div class='task-col'><input type='text' id='task-input-"+listItem.id+"' name='task-input' value='"+listItem.description+"'></div>"
                                + "<div class='due-date-col'><input type='date' id='date-input-"+listItem.id+"' name='date-input' value='"+listItem.dueDate+"'></div>"
                                + "<div class='status-col'><select id='status-input-"+listItem.id+"' name='status-input' value='"+listItem.status+"'><option value='incomplete'>incomplete</option><option value='complete'>complete</option></select></div>"
                                + "<div class='list-controls-col'>"
                                + " <div value='enabled' name='up-arrow' id='up-arrow-"+listItem.id+"' class='list-item-control material-icons'>keyboard_arrow_up</div>"
                                + " <div value='enabled' name='down-arrow' id='down-arrow-"+listItem.id+"' class='list-item-control material-icons'>keyboard_arrow_down</div>"
                                + " <div name='close-item' id='close-item-"+listItem.id+"' class='list-item-control material-icons'>close</div>"
                                + " <div class='list-item-control'></div>"
                                + " <div class='list-item-control'></div>"
                                + "</div>";
            }
            }
            
            itemsListDiv.innerHTML += listItemElement;
        }
        this.controller.setUpControls();
        this.controller.setUpInfo();
    }

    // THE VIEW NEEDS THE CONTROLLER TO PROVIDE PROPER RESPONSES
    setController(initController) {
        this.controller = initController;
    }
}