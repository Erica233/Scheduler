import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import styled from "styled-components";
import "../App.css";

const day_options = [
  { value: "Sunday", label: "Sunday" },
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" },
];

const animatedComponents = makeAnimated();

const Day = (props) => {
  const [daysOption, setDaysOption] = useState(null);

  const dropdownChangeHandler = (option) => {
    setDaysOption(option);
    // mapping from option's object to array only contains value
    props.onChangeFilter(option.map(option => option.value));
  };

  return (
    <div className="row">
      <label>{props.description}</label>
      <SelectsContainer>
        <Select
          className="select"
          closeMenuOnSelect={false}
          allowClear
          placeholder="Please Select"
          isMulti="True"
          options={day_options}
          components={animatedComponents}
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

export default Day;
