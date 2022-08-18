import React, { useState } from "react";
// import Select from "react-select";
import "../../App.css";
import styled from "styled-components";
import { Select } from "antd";

const semester_options = [
  { value: "fall", label: "Fall" },
  { value: "spring", label: "Spring" },
  { value: "summer1", label: "Summer Term 1" },
  { value: "summer2", label: "Summer Term 2" },
];

const SemesterChoice = (props) => {
  const [semesterOption, setSemesterOption] = React.useState(null);

  // get selected value
  const dropdownChangeHandler = (option) => {
    setSemesterOption(option);
    props.onChangeFilter(option);
  };

  return (
    <div className="row">
      <label>{props.description}</label>
      <SelectsContainer>
        <Select
          className="select"
          placeholder="Please Select"
          options={semester_options}
          onChange={dropdownChangeHandler}
        />
      </SelectsContainer>
    </div>
  );
};

const SelectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 20%;
  width: 100%;
`;

export default SemesterChoice;
