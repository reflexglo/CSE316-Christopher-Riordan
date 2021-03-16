import React, { Component } from 'react'

class ListTitle extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {value: this.props.title};
    }
  
    handleChange(event) {
      this.props.changeTitle(event.target.value);
      this.setState({value: event.target.value});
    }


    render() {
      return (
            <input className="todo-list-title" type="text" value={this.props.title} onChange={this.handleChange} />
      );
    }
  }
  export default ListTitle;