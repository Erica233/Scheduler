import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import "../App.css";
import styled from "styled-components";
import SemesterChoice from "./semesterChoice";
import YearChoice from "./YearChoice";
import GradeChoice from "./identity";
import DayChoice from "./day";
// import ImportButton from "./ImportButton";
import { useDispatch } from "react-redux";
import { setTableName, setData, setFromImport } from "../redux/slices/tableSlice";
import Papa from "papaparse";

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
      // aimi host: vcm-26740.vm.duke.edu -> upload-form
      const res = await fetch("http://localhost:1999/upload-file", {
        method: "POST",
        body: JSON.stringify(form_data),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      console.log(res.message);
      dispatch(setTableName(table_name));
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
        <YearChoice description="Year" onChangeFilter={addYearHandler} />
        <SemesterChoice
          description="Semester"
          onChangeFilter={addSemesterHandler}
        />
        <GradeChoice description="Grade" onChangeFilter={addGradeHandler} />
        <DayChoice description="Days" onChangeFilter={addDaysHandler} />
        <FormButton title="Start a new Table" />
        <hr className="horizontalRule"></hr>
      </form>
      <ImportButton title="Import Schedule From Local" />
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
  const [inputField, setInputField] = useState({
    columns: [],
    data: [],
});

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);
  //
  const handleImport = (event) => {

    try {
      const file = event.target.files[0];
      console.log(file);
      Papa.parse(file, {
        header: true,
        complete: function (results) {
          const rowsArray = [];
          const valuesArray = [];
  
          results.data.map((d) => {
            rowsArray.push(Object.keys(d));
            valuesArray.push(Object.values(d));
          });

          setInputField(results.data);
        // Filtered Column Names
        setTableRows(rowsArray[0]);
        inputField.columns = rowsArray[0];
        console.log(inputField.columns);

        // Filtered Values
        setValues(valuesArray);
        inputField.data = valuesArray;
        console.log(inputField.data);
        }
      });
      const file_name = file.name.split('.').slice(0, -1).join('.');
      console.log(file_name);
      dispatch(setTableName(file_name));
      dispatch(setFromImport(inputField));
      // history.push("/edited");
    } catch (error) {
      //handle some error here
    }
  };
  //

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
