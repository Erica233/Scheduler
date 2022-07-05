import React from "react";
import Select from "react-select";
import "../App.css";
import styled from "styled-components";

const semester_options = [
  { value: "Spring", label: "Spring" },
  { value: "Summer", label: "Summer" },
  { value: "Fall", label: "Fall" },
];

const SemesterChoice = (props) => {
  return (
    <div className="row">
      <label>{props.description}</label>
      <SelectsContainer>
        <Select
          className="select"
          placeholder="Select"
          options={semester_options}
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
