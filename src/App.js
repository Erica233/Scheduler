// import logo from './logo.svg';
import './App.css';
import React from 'react';
import Choice from './components/choice';
import Day from './components/day';
import Identity from './components/identity';

const semesters = [
  { value: 'Spring 2023', label: 'Spring 2023' },
  { value: 'Fall 2022', label: 'Fall 2022' },
  { value: 'Summer 2022', label: 'Summer 2022' },
];
// const graduates = [
//   { value: 'Graduate', label: 'Graduate' },
//   { value: 'Undergraduate', label: 'Undergraduate' },
// ];

function App () {
  return (
    <div className="App">
      <p class="box">
        <span>Table Name</span>
        <br></br>
        <input clearable showCount maxLength={20} />
        <br></br>
        <span>Semester</span>
        <Choice/>
        <br></br>
        <span>Graduate/Undergraduate</span>
        <Identity/>
        <br></br>
        <span>Day of the Week</span>
        <Day/>
        <button type="button">Save</button>
      </p>
      </div>
  )
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


export default App;
