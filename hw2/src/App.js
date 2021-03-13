// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import testData from './test/testData.json'
import jsTPS from './common/jsTPS'
import AddNewList_Transaction from './AddNewList_Transaction'
import AddNewItem_Transaction from './AddNewItem_Transaction'
import DeleteList_Transaction from './DeleteList_Transaction'
import CloseList_Transaction from './CloseList_Transaction'
import MoveUp_Transaction from './MoveUp_Transaction'
import MoveDown_Transaction from './MoveDown_Transaction'
import CloseItem_Transaction from './CloseItem_Transaction'
import ChangeTask_Transaction from './ChangeTask_Transaction'
import ChangeDate_Transaction from './ChangeDate_Transaction'
import ChangeStatus_Transaction from './ChangeStatus_Transaction'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

// THESE ARE OUR REACT COMPONENTS
import Navbar from './components/Navbar'
import LeftSidebar from './components/LeftSidebar'
import Workspace from './components/Workspace'
{/*import ItemsListHeaderComponent from './components/ItemsListHeaderComponent'
import ItemsListComponent from './components/ItemsListComponent'
import ListsComponent from './components/ListsComponent'
*/}
class App extends Component {
  constructor(props) {
    // ALWAYS DO THIS FIRST
    super(props);

    // DISPLAY WHERE WE ARE
    console.log("App constructor");

    // MAKE OUR TRANSACTION PROCESSING SYSTEM
    this.tps = new jsTPS();

    // CHECK TO SEE IF THERE IS DATA IN LOCAL STORAGE FOR THIS APP
    let recentLists = localStorage.getItem("recentLists");
    console.log("recentLists: " + recentLists);
    if (!recentLists) {
      recentLists = JSON.stringify(testData.toDoLists);
      localStorage.setItem("toDoLists", recentLists);
    }
    recentLists = JSON.parse(recentLists);

    // FIND OUT WHAT THE HIGHEST ID NUMBERS ARE FOR LISTS
    let highListId = -1;
    let highListItemId = -1;
    for (let i = 0; i < recentLists.length; i++) {
      let toDoList = recentLists[i];
      if (toDoList.id > highListId) {
        highListId = toDoList.id;
      }
      for (let j = 0; j < toDoList.items.length; j++) {
        let toDoListItem = toDoList.items[j];
        if (toDoListItem.id > highListItemId)
        highListItemId = toDoListItem.id;
      }
    };

    // SETUP OUR APP STATE
    this.state = {
      toDoLists: recentLists,
      currentList: {items: []},
      nextListId: highListId+1,
      nextListItemId: highListItemId+1,
      useVerboseFeedback: true
    }
  }

  // WILL LOAD THE SELECTED LIST
  loadToDoList = (toDoList) => {
    console.log("loading " + toDoList);

    // MAKE SURE toDoList IS AT THE TOP OF THE STACK BY REMOVING THEN PREPENDING
    const nextLists = this.state.toDoLists.filter(testList =>
      testList.id !== toDoList.id
    );
    nextLists.unshift(toDoList);

    this.setState({
      toDoLists: nextLists,
      currentList: toDoList
    });
  }

  addNewListTransaction = () => {
    let transaction = new AddNewList_Transaction(this);
    this.tps.addTransaction(transaction);
  }

  addNewList = () => {
    let newToDoListInList = [this.makeNewToDoList()];
    let newToDoListsList = [...newToDoListInList, ...this.state.toDoLists];
    let newToDoList = newToDoListInList[0];

    // AND SET THE STATE, WHICH SHOULD FORCE A render
    this.setState({
      toDoLists: newToDoListsList,
      currentList: newToDoList,
      nextListId: this.state.nextListId+1
    }, this.afterToDoListsChangeComplete);
    return newToDoList;
  }

  addNewItemTransaction = () => {
    let transaction = new AddNewItem_Transaction(this);
    this.tps.addTransaction(transaction);
  }

  addNewItem = () => {
    let thisList = this.state.currentList;
    let newItem = this.makeNewToDoListItem();
    if(thisList!=null){
    thisList.items[thisList.items.length] = newItem;
    this.setState({
      toDoLists: this.state.toDoLists,
      currentList: thisList,
      nextListItemId: this.state.nextListItemId+1
    },this.afterToDoListsChangeComplete);
  }
  return newItem;
  }

  deleteListTransaction = () => {
      console.log("hiiiiii");
      let transaction = new DeleteList_Transaction(this);
      this.tps.addTransaction(transaction);
  }

  deleteList = () => {
    let thisList = this.state.currentList;
    if(thisList!=null){
    let allLists = this.state.toDoLists;
    let ind = allLists.indexOf(thisList);
    allLists.splice(ind,1);
    if(ind!=-1){
    this.setState({
      toDoLists: this.state.toDoLists,
      currentList: {items:[]},
      toDoLists: allLists,
      nextListId: this.state.nextListId
    },this.afterToDoListsChangeComplete);
  }
  }
  return thisList;
  }

  closeListTransaction = () => {
    let transaction = new CloseList_Transaction(this);
    this.tps.addTransaction(transaction);
  }

  closeList = () => {
    let thisList = this.state.currentList;
    this.setState({
      toDoLists: this.state.toDoLists,
      currentList: {items:[]},
      nextListId: this.state.nextListId
    },this.afterToDoListsChangeComplete);
    return thisList;
  }

  moveUpTransaction = (item) => {
    let transaction = new MoveUp_Transaction(this,item);
    this.tps.addTransaction(transaction);
  }

  moveUp = (item) => {
    let thisList = this.state.currentList;
    let ind = thisList.items.indexOf(item);
    if(ind-1>=0){
    let temp = thisList.items[ind-1];
    thisList.items[ind-1] = item;
    thisList.items[ind] = temp;
    this.setState({
      toDoLists: this.state.toDoLists,
      currentList: thisList,
      nextListId: this.state.nextListId
    },this.afterToDoListsChangeComplete);
  }
  }

  moveDownTransaction = (item) => {
    let transaction = new MoveDown_Transaction(this,item);
    this.tps.addTransaction(transaction);
  }

  moveDown = (item) => {
    let thisList = this.state.currentList;
    let ind = thisList.items.indexOf(item);
    if(ind+1<thisList.items.length){
    let temp = thisList.items[ind+1];
    thisList.items[ind+1] = item;
    thisList.items[ind] = temp;
    this.setState({
      toDoLists: this.state.toDoLists,
      currentList: thisList,
      nextListId: this.state.nextListId
    },this.afterToDoListsChangeComplete);
  }
  }

  closeItemTransaction = (item) => {
    let transaction = new CloseItem_Transaction(this,item);
    this.tps.addTransaction(transaction);
  }

  closeItem = (item) => {
    let thisList = this.state.currentList;
    let ind = thisList.items.indexOf(item);
    thisList.items.splice(ind,1);
    this.setState({
      toDoLists: this.state.toDoLists,
      currentList: thisList,
      nextListId: this.state.nextListId
    },this.afterToDoListsChangeComplete);
    return ind;
  }

  changeTaskTransaction = (item,newTask,oldTask) => {
    let transaction = new ChangeTask_Transaction(this,item,newTask,oldTask);
    this.tps.addTransaction(transaction);
  }

  changeDateTransaction = (item,newDate,oldDate) => {
    let transaction = new ChangeDate_Transaction(this,item,newDate,oldDate);
    this.tps.addTransaction(transaction);
  }

  changeStatusTransaction = (item,newStatus,oldStatus) => {
    let transaction = new ChangeStatus_Transaction(this,item,newStatus,oldStatus);
    this.tps.addTransaction(transaction);
  }

  makeNewToDoList = () => {
    let newToDoList = {
      id: this.highListId,
      name: 'Untitled',
      items: []
    };
    return newToDoList;
  }

  makeNewToDoListItem = () =>  {
    let newToDoListItem = {
      description: "No Description",
      dueDate: "none",
      status: "incomplete"
    };
    return newToDoListItem;
  }

  // THIS IS A CALLBACK FUNCTION FOR AFTER AN EDIT TO A LIST
  afterToDoListsChangeComplete = () => {
    console.log("App updated currentToDoList: " + this.state.currentList);

    // WILL THIS WORK? @todo
    let toDoListsString = JSON.stringify(this.state.toDoLists);
    localStorage.setItem("recent_work", toDoListsString);
  }

  undo = () => {
    if (this.tps.hasTransactionToUndo()) {
      this.tps.undoTransaction();
    }
  }
  redo = () => {
    if (this.tps.hasTransactionToRedo()) {
      this.tps.doTransaction();
    }
  }
  undoStatus = () => {
    if (this.tps.hasTransactionToUndo()) {
      return "enabled";
    }
    else{
      return "disabled";
    }
  }
  redoStatus = () => {
    if (this.tps.hasTransactionToRedo()) {
      return "enabled";
    }
    else{
      return "disabled";
    }
  }


  nothing = () => {

  }

  confirmDelete = () => {
    confirmAlert({
      title: 'Confirm delete',
      message: 'Are you sure want to delete this list?',
      buttons: [
        {
          label: 'Yes',
          onClick: this.deleteListTransaction
        },
        {
          label: 'Cancel',
          onClick: this.nothing
        }
      ]
    });
  };

  render() {
    let items = this.state.currentList.items;
    return (
      <div id="root">
        <Navbar />
        <LeftSidebar 
          toDoLists={this.state.toDoLists}
          loadToDoListCallback={this.loadToDoList}
          addNewListCallback={this.addNewListTransaction}
        />
        <Workspace 
        toDoListItems={items}
        currentToDoList={this.state.currentList}
        addNewItemCallBack={this.addNewItemTransaction}
        deleteListCallBack={this.confirmDelete}
        closeListCallBack={this.closeListTransaction}
        moveUpItemCallBack={this.moveUpTransaction}
        moveDownItemCallBack={this.moveDownTransaction}
        closeItemCallBack={this.closeItemTransaction}
        changeTaskCallBack={this.changeTaskTransaction}
        changeDateCallBack={this.changeDateTransaction}
        changeStatusCallBack={this.changeStatusTransaction}
        undoCallBack={this.undo}
        redoCallBack={this.redo}
        undoStatus={this.undoStatus}
        redoStatus={this.redoStatus}
        />
      </div>
    );
  }
}

export default App;