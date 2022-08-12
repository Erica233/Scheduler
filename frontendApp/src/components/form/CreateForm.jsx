import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { message } from "antd";
import styled from "styled-components";
import SemesterChoice from "./SemesterChoice";
import YearChoice from "./YearChoice";
import GradeChoice from "./Identity";
import DayChoice from "./Day";
import { useDispatch } from "react-redux";
import {
  setTableName,
  setData,
  setFromImport,
  setSelectedYear,
  setStartWeek,
} from "../../redux/slices/tableSlice";
import Papa from "papaparse";
import Divider from '@mui/material/Divider';
import "../../App.css";

const CreateForm = () => {
  const dispatch = useDispatch();

  let table_name = "",
    year = "",
    semester = "",
    grade = "",
    days = "";

  const addTableNameHandler = (_table_name) => {
    table_name = _table_name;
  };
  const addYearHandler = (_year) => {
    year = _year;
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
        year: year,
        semester: semester,
        grade: grade,
        days: days,
      };
      //test host: http://10.197.120.183:1999/upload-file
      //aimin host: http://vcm-26740.vm.duke.edu:2001/upload-form
      const res = await fetch("http://vcm-27091.vm.duke.edu:2002/upload-form", {
        method: "POST",
        body: JSON.stringify(form_data),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      if (res.data) {
        dispatch(setStartWeek(res.startDate));
        dispatch(setTableName(table_name));
        dispatch(setSelectedYear(year));
        dispatch(setData(res.message));
        history.push("/edited");
      } else {
        message.error({
          content: `${res.message}`,
          className: "custom-class",
          style: {
            marginTop: "20vh",
          },
        });
      }
    } catch (error) {
      //handle some error here
    }
  };

  return (
    <div>
      <ImportButton title="IMPORT SCHEDULE" />
      <Divider>Create a new Schedule</Divider>
      <form onSubmit={handleSubmit} style={{padding: "20px"}}>
        <FormInput
          description="CHEDULE NAME"
          placeholder="Enter Your Schedule Name"
          type="text"
          onChangeInput={addTableNameHandler}
        />
        <YearChoice description="YEAR" onChangeFilter={addYearHandler} />
        <SemesterChoice
          description="SEMESTER"
          onChangeFilter={addSemesterHandler}
        />
        <GradeChoice description="LEVEL" onChangeFilter={addGradeHandler} />
        <DayChoice description="DAYS" onChangeFilter={addDaysHandler} />
        <FormButton title="START" />
      </form>
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

const ImportButton = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const fileRef = useRef();

  const handleImport = (event) => {
    try {
      const file = event.target.files[0];
      console.log(file);
      const parseFile = Papa.parse(file, {
        header: true,
        complete: function (results) {
          const rowsArray = [];
          const valuesArray = [];
          let inputField = {};

          results.data.map((d) => {
            rowsArray.push(Object.keys(d));
            valuesArray.push(Object.values(d));
            console.log(d);
          });
          inputField.columns = rowsArray[0];
          inputField.data = valuesArray;

          dispatch(setFromImport(inputField));
        },
      });

      const file_name = file.name.split(".").slice(0, -1).join(".");
      console.log(file_name);
      dispatch(setTableName(file_name));
      history.push("/edited");
    } catch (error) {
      //handle some error here
    }
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
          onChange={handleImport}
          // multiple={false}
          type="file"
          name="localFile"
          accept=".csv"
          hidden
        />
      </div>
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
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.5);
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
