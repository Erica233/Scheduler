import React, { useState } from "react";
// import Select from "react-select";
import styled from "styled-components";
import { Select } from "antd";

import "../../App.css";

const grade_options = [
  { value: "undergraduate", label: "Undergraduate" },
  { value: "graduate", label: "Graduate" },
];

const Identity = (props) => {
  const [gradeOption, setGradeOption] = useState(null);

  const dropdownChangeHandler = (option) => {
    setGradeOption(option);
    props.onChangeFilter(option.value);
  };

  return (
    <div className="row">
      <label>{props.description}</label>
      <SelectsContainer>
        <Select
          className="select"
          placeholder="Please Select"
          options={grade_options}
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

export default Identity;
