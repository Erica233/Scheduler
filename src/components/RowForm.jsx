import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRow } from "../redux/slices/tableSlice";
import { DatePicker, Space } from 'antd';
import "antd/dist/antd.css";
import "./Popup.css";

function RowForm() {
  const dispatch = useDispatch();
  const table_year = useSelector((state) => state.selected_year);
  const [inputField, setInputField] = useState({
    week: "", //number
    date: "", //
  });

  var temptTime = new Date(inputField.date);
  var weekday;
  if (temptTime.getDay() == 6) {
    weekday = 7;
  } else {
    weekday = temptTime.getDay();
  }
  temptTime.setDate(temptTime.getDate() - weekday + 6);
  var firstDay = new Date(temptTime.getFullYear(), 0, 1);
  var dayOfWeek = firstDay.getDay();
  var spendDay = 1;
  if (dayOfWeek != 0) {
    spendDay = 7 - dayOfWeek + 1;
  }
  firstDay = new Date(temptTime.getFullYear(), 0, 1 + spendDay);
  var d = Math.ceil(
    (temptTime.valueOf() - firstDay.valueOf()) / (24 * 60 * 60 * 1000)
  );
  var result = Math.ceil(d / 7);
  inputField.week = result + 1;

  console.log(`Week Number (${temptTime}) is ${inputField.week}.`);

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
    dispatch(addRow(inputField));
    // if input year is not table year
    // if (parseInt(date[0]) !== table_year) {
    //   alert(`Please select date in ${table_year}`);
    // } else {
    //   dispatch(addRow(inputField));
    // }
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
          style={{marginRight: "40px"}}
        />
        <button
          className="popup__btn"
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
