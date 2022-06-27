import React from 'react';
import Select from 'react-select';

const semesters = [
  { value: 'Spring 2023', label: 'Spring 2023' },
  { value: 'Fall 2022', label: 'Fall 2022' },
  { value: 'Summer 2022', label: 'Summer 2022' },
];

// const graduates = [
//   { value: 'Graduate', label: 'Graduate' },
//   { value: 'Undergraduate', label: 'Undergraduate' },
// ];


class Choice extends React.Component {
  state = {
    selectedOption: null,
  };
  handleChange = (selectedOption) => {
    this.setState({ selectedOption }, () =>
      console.log(`Option selected:`, this.state.selectedOption)
    );
  };
  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        size='small'
        placeholder='Please Select'
        value={selectedOption}
        onChange={this.handleChange}
        options={semesters}
      />
    );
  }
}

export default Choice;


