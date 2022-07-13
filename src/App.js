<<<<<<< HEAD
// import logo from './logo.svg';
import './App.css';
import React from 'react';
import Choice from './components/choice';
import Day from './components/day';
import Identity from './components/identity';
import TemplateSelector from './components/templateSelector';
=======
import "./App.css";
import React from "react";
import styled from "styled-components";
import CreateForm from "./components/createForm";
>>>>>>> ea8e27e56220c04152cd27ccac49ff2b36962468

function App() {
  return (
<<<<<<< HEAD
    <div className="App">
      <p className="box">
        <span>Table Name</span>
        <br></br>
        <input clearable showCount maxLength={20} />
        <br></br>
        <br></br>
        <span>Semester</span>
        <Choice/>
        <br></br>
        <span>Graduate/Undergraduate</span>
        <Identity/>
        <br></br>
        <span>Day of the Week</span>
        <Day/>
        {/* <TemplateSelector/> */}
        <button type="button">Save</button>
      </p>
      <p className="slide">
      <TemplateSelector/>
      </p>
      </div>
  )
=======
    <MainContainer>
      <FormHeader title="Course Scheduler" />
      <CreateForm />
    </MainContainer>
  );
>>>>>>> ea8e27e56220c04152cd27ccac49ff2b36962468
}

export default App;

const FormHeader = (props) => <h2 id="headerTitle">{props.title}</h2>;

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 80vh;
  width: 30vw;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 15px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  overflow: auto;
  @media only screen and (max-width: 320px) {
    width: 80vw;
    height: 90vh;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 360px) {
    width: 80vw;
    height: 90vh;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 90vh;
  }

  @media only screen and (min-width: 768px) {
    width: 70vw;
    height: 80vh;
  }
  @media only screen and (min-width: 1024px) {
    width: 40vw;
    height: 90vh;
  }
  @media only screen and (min-width: 1280px) {
    width: 40vw;
    height: 90vh;
  }
`;
