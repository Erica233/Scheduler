import React from 'react';
import { useDispatch } from "react-redux";
import { addColumn, deleteColumn } from '../redux/slices/tableSlice';

class ColumnForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A new column is added: ' + this.state.value);
    event.preventDefault();
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Column Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <button type="submit" value="Submit" onClick={()=>useDispatch(addColumn())}>Submit</button>
      </form>
    );
  }
}

export default ColumnForm;