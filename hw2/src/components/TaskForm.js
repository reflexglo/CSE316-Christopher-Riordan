import React, { Component } from 'react'

class TaskForm extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {value: this.props.task};
    }
  
    handleChange(event) {
      this.props.changeTaskCallBack(this.props.itemChanged,event.target.value,this.state.value);
      this.setState({value: event.target.value});
    }


    render() {
      return (
            <input className="task-input" type="text" value={this.props.task} onChange={this.handleChange} />
      );
    }
  }
  export default TaskForm;