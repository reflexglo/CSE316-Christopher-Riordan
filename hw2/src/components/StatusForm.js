import React, { Component } from 'react'

class StatusForm extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {value: this.props.status};
    }
  
    handleChange(event) {
      this.props.changeStatusCallBack(this.props.itemChanged,event.target.value,this.state.value);
      this.setState({value: event.target.value});
    }


    render() {
        if(this.props.status=="complete"){
            return (
                <select className="status-complete" value={this.props.status} onChange={this.handleChange}>
                    <option value="complete">Complete</option>
                    <option value="incomplete">Incomplete</option>
                </select>
          );
        }
        else{
            return (
                <select className="status-incomplete" value={this.props.status} onChange={this.handleChange}>
                    <option value="complete">Complete</option>
                    <option value="incomplete">Incomplete</option>
                </select>
          );
        }
      
    }
  }
  export default StatusForm;