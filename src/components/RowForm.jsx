import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRow } from "../redux/slices/tableSlice";
import "antd/dist/antd.css";

function RowForm() {
  const dispatch = useDispatch();
  const table_year = useSelector((state) => state.selected_year);
  const [inputField, setInputField] = useState({
    week: "", //number
    date: "", //
  });

  var inputDate = new Date(inputField.date);
  var oneJan = new Date(inputDate.getFullYear(), 0, 1);
  var numberOfDays = Math.floor((inputDate - oneJan) / (24 * 60 * 60 * 1000));
  var result = Math.ceil((inputDate.getDay() + 1 + numberOfDays) / 7);
  inputField.week = result;
  console.log(`Week Number (${inputDate}) is ${inputField.week}.`);

  const weekHandler = (event) => {
    setInputField({ ...inputField, week: event.target.value });
    //console.log(event);
  };

  const dateHandler = (event) => {
    setInputField({ ...inputField, date: event.target.value });
    //console.log(event);
  };

  const handleSubmit = () => {
    const date = inputField.date.split("-");
    // if input year is not table year 
    if (parseInt(date[0]) !== table_year) {
      alert(`Please select date in ${table_year}`);
    } else {
      dispatch(addRow(inputField));
    }
  };

  return (
    <div>
      <form name="addRow">
        {/* <input
                  type="number" required
                  min="1" max="99"
                  onChange={weekHandler}
                  value={inputField.week}
                  placeholder="Week"
                  name="week" /> */}
        <input
          type="date"
          required
          onChange={dateHandler}
          value={inputField.date}
          placeholder="Date"
          name="date"
        />
        <br />
        <button
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default RowForm;
