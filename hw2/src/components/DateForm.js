import React, { Component } from 'react'

class DateForm extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {value: this.props.date};
    }
  
    handleChange(event) {
      this.props.changeDateCallBack(this.props.itemChanged,event.target.value,this.state.value);
      this.setState({value: event.target.value});
    }


    render() {
      return (
            <input className="date-input" type="date" value={this.props.date} onChange={this.handleChange} />
      );
    }
  }
  export default DateForm;