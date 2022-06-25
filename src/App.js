// import logo from './logo.svg';
import './App.css';
import React from 'react';
import Select from 'react-select';

const semesters = [
  { value: 'Spring 2023', label: 'Spring 2023' },
  { value: 'Fall 2022', label: 'Fall 2022' },
  { value: 'Summer 2022', label: 'Summer 2022' },
];
const graduates = [
  { value: 'Graduate', label: 'Graduate' },
  { value: 'Undergraduate', label: 'Undergraduate' },
];

class App extends React.Component {
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
      <>
      <span>Semester</span>
      <Select defaultValue={"Semester"} size="small"
        value={selectedOption}
        onChange={this.handleChange}
        options={semesters}
      />
      <span >Graduate/Undergraduate</span>
      <Select defaultValue={"Graduate"} size="small"
        value={selectedOption}
        onChange={this.handleChange}
        options={graduates}
      />
      <span>Table Name</span>
      <br>
      </br>
      <input name='table name' type='text' required></input>
      <div>
  <button>Start</button>
  </div>
      </>
    );
  }
}


    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
//   );
// }

export default App;
