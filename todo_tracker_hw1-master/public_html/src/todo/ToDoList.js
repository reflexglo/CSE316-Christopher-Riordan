'use strict'

/**
 * ToDoList.js
 * 
 * This class represents a list with all the items in our todo list.
 * 
 * @author McKilla Gorilla
 */
export default class ToDoList {
    /**
     * The constructor creates a default, empty list.
     */
    constructor(initId) {
        this.id = initId;
        this.name = "Unnknown";
        this.items = [];
    }   
    
    // GETTER/SETTER METHODS

    setName(initName) {
        this.name = initName;
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }
    /**
     * Adds an item to the end of the list.
     * 
     * @param {TodoListItem} itemToAdd Item to add to the list.
     */
    addItem(itemToAdd) { 
        this.items.push(itemToAdd);
    }

    /**
     * Finds and then removes the argument from the list.
     * 
     * @param {TodoListItem} itemToRemove Item to remove from the list.
     */
    removeItem(itemToRemove) {
        let indexOfItem = -1;
        for (let i = 0; (i < this.items.length) && (indexOfItem < 0); i++) {
            if (this.items[i].id === itemToRemove.id) {
                indexOfItem = i;
            }
        }
        this.items.splice(indexOfItem, 1);
    }

    /**
     * Finds the index of the argument in the list.
     * 
     * @param {TodoListItem} item Item to search for in the list.
     */
    getIndexOfItem(item) {
        for (let i = 0; i < this.items.length; i++) {
            let testItem = this.items[i];
            if (testItem === item) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Gets and returns the item at the index location.
     * 
     * @param {Number} index Location in the list of item to return.
     */
    getItemAtIndex(index) {
        return this.items[index];
    }
    getItemById(itemId){
        for(let nextItem of this.items){
            if(nextItem.id == itemId){
               return nextItem;
               }
        }
        return null;
    }
    addItemBefore(index,itemToAdd){
        if(index<this.items.length){
            let temp = null;
            let length = this.items.length+1;
            for(let i = 0;i<length;i++){
                if(i == index){
                    temp = this.items[index];
                    this.items[index] = itemToAdd;
               }
                if(i>index){
                    let newTemp = this.items[index];
                    if(i == length-1){
                        this.items.push(temp);
                    }
                else{
                    this.items[i] = temp;
                }
                temp = newTemp;
               }
            
        }
    }
        else{
            this.items.push(itemToAdd);
        }
    }
}