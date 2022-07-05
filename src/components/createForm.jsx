import React, { useRef, useState } from "react";
import "../App.css";
import styled from "styled-components";
import SemesterChoice from "./semesterChoice";
import GradeChoice from "./identity";
import DayChoice from "./day";

const CreateForm = () => {
  return (
    <div>
      <FormInput
        description="Table Name"
        placeholder="Enter Your Schedule Name"
        type="text"
      />
      <SemesterChoice description="Semester" />
      <GradeChoice description="Grade" />
      <DayChoice description="Days" />
      <FormButton title="Start a new Table" />
      <hr className="horizontalRule"></hr>
      <ImportButton title="Import schdule from local" />
    </div>
  );
};

const FormButton = (props) => (
  <div id="button" className="row">
    <div className="buttonContainer">
      <button className="formButton" type="submit">
        {props.title}
      </button>
    </div>
  </div>
);

const ImportButton = (props) => {
  const fileRef = useRef();

  const handleChange = (event) => {
    const [file] = event.target.files;
    console.log(file);
  };
  return (
    <div id="button" className="row">
      <div className="buttonContainer">
        <button
          className="importButton"
          onClick={() => fileRef.current.click()}
        >
          {props.title}
        </button>
        <input
          ref={fileRef}
          onChange={handleChange}
          multiple={false}
          type="file"
          hidden
        />
      </div>
    </div>
  );
};

const FormInput = (props) => {
  return (
    <div className="row">
      <label>{props.description}</label>
      <InputContainer>
        <StyledInput
          type={props.type}
          placeholder={props.placeholder}
        ></StyledInput>
      </InputContainer>
    </div>
  );
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
  margin: 0 0 1rem 0;
`;

const StyledInput = styled.input`
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 2rem;
  width: 80%;
  height: 3rem;
  padding: 1rem;
  border: none;
  outline: none;
  color: #3c354e;
  font-size: 1rem;
  font-weight: bold;
  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #b9abe0;
    backdrop-filter: blur(12rem);
    border-radius: 2rem;
  }
  &::placeholder {
    color: #b9abe099;
    font-weight: 100;
    font-size: 1rem;
  }

  @media only screen and (max-width: 320px) {
    height: 1rem;
  }
  @media only screen and (min-width: 360px) {
    height: 1rem;
  }
  @media only screen and (min-width: 411px) {
    height: 1rem;
  }

  @media only screen and (min-width: 768px) {
    height: 1.5rem;
  }
  @media only screen and (min-width: 1024px) {
    height: 2rem;
  }
  @media only screen and (min-width: 1280px) {
    height: 3rem;
  }
`;

export default CreateForm;
