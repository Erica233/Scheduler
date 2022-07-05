import React from "react";
import Select from "react-select";
import styled from "styled-components";
import "../App.css";

const grade_options = [
  { value: "Graduate", label: "Graduate" },
  { value: "Undergraduate", label: "Undergraduate" },
];

const Identity = (props) => {
  return (
    <div className="row">
      <label>{props.description}</label>
      <SelectsContainer>
<Select
        className="select"
        size="small"
        placeholder="Please Select"
        options={grade_options}
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
