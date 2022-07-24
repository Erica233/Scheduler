import React, { useState } from "react";
import Select from "react-select";
import "../App.css";
import styled from "styled-components";

const YearChoice = (props) => {
  const [yearOption, setYearOption] = React.useState(null);

  // get selected years(select last 10 years)
  const year = new Date().getFullYear();
  const years = Array.from(new Array(10), (val, index) => year - index + 1);

  const year_options = years.map((arr) => {
    return {
      value: arr,
      label: `${arr}`,
    };
  });

  // get selected value
  const dropdownChangeHandler = (option) => {
    setYearOption(option);
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
          options={year_options}
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

export default YearChoice;
