import React from 'react';
import Select from 'react-select';

const graduates = [
  { value: 'Graduate', label: 'Graduate' },
  { value: 'Undergraduate', label: 'Undergraduate' },
];


class Identity extends React.Component {
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
        options={graduates}
      />
    );
  }
}

export default Identity;


