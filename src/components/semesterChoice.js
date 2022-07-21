import React, { useState } from "react";
import Select from "react-select";
import "../App.css";
import styled from "styled-components";

const semester_options = [
  { value: "spring", label: "Spring" },
  { value: "summer", label: "Summer" },
  { value: "fall", label: "Fall" },
];

const SemesterChoice = (props) => {
  const [semesterOption, setSemesterOption] = React.useState(null);

  // get selected value
  const dropdownChangeHandler = (option) => {
    setSemesterOption(option);
    props.onChangeFilter(option.value);
  };

  return (
    <div className="row">
      <label>{props.description}</label>
      <SelectsContainer>
        <Select
          className="select"
          size="small"
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
