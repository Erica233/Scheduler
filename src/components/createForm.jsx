import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import "../App.css";
import styled from "styled-components";
import SemesterChoice from "./semesterChoice";
import GradeChoice from "./identity";
import DayChoice from "./day";
import ImportButton from "./ImportButton";
import { useDispatch } from "react-redux";
import { resetState, setData } from '../redux/slices/tableSlice';

const CreateForm = () => {
  const dispatch = useDispatch();

  let table_name = "",
    semester = "",
    grade = "",
    days = "";

  const addTableNameHandler = (_table_name) => {
    table_name = _table_name;
  };
  const addSemesterHandler = (_semester) => {
    semester = _semester;
  };
  const addGradeHandler = (_grade) => {
    grade = _grade;
  };
  const addDaysHandler = (_days) => {
    days = _days;
  };

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const form_data = {
        table_name: table_name,
        semester: semester,
        grade: grade,
        days: days,
      };
      const res = await fetch("http://172.28.230.31:1999/upload-file", {
        method: "POST",
        body: JSON.stringify(form_data),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      // console.log(res.message);
      dispatch(setData(res.message));
      history.push("/edited");
    } catch (error) {
      //handle some error here
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormInput
          description="Table Name"
          placeholder="Enter Your Schedule Name"
          type="text"
          onChangeInput={addTableNameHandler}
        />
        <SemesterChoice
          description="Semester"
          onChangeFilter={addSemesterHandler}
        />
        <GradeChoice description="Grade" onChangeFilter={addGradeHandler} />
        <DayChoice description="Days" onChangeFilter={addDaysHandler} />
        <FormButton title="Start a new Table" />
        <hr className="horizontalRule"></hr>
      </form>
      <ImportButton title="Import schdule from local" />
    </div>
  );
};

const FormInput = (props) => {
  const [table_name, setTableName] = React.useState("");
  const handleChangeTableName = (event) => {
    setTableName(event.target.value);
    props.onChangeInput(event.target.value);
  };
  return (
    <div className="row">
      <label>{props.description}</label>
      <InputContainer>
        <StyledInput
          type={props.type}
          placeholder={props.placeholder}
          onChange={handleChangeTableName}
          required
        ></StyledInput>
      </InputContainer>
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
