import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRow } from "../../redux/slices/tableSlice";
import { Form, Button, DatePicker } from "antd";
import "antd/dist/antd.css";
import "./Popup.css";

const getTimeStamp = (input_date) => {
  input_date = input_date.split("-");
  let date_obj = new Date(input_date[0], input_date[1] - 1, input_date[2]);
  // get timestamp and week of new data
  let timestamp = date_obj.getTime() / 1000;
  return timestamp;
};

// const checkDate = (timestamp) => {
//   table_data

//   return 
// };

function NewRowForm(props) {
  const dispatch = useDispatch();
  const table_year = useSelector((state) => state.selected_year);
  const table_data = useSelector((state) => state.data);
  let inputField = { week: "", date: ""};

  const isDateExist = (new_date_timestamp) =>
    table_data.some((data) => {
      return data.timestamp === new_date_timestamp;
    });

  const dateHandler = (date, dateString) => {
    console.log(date);
    let temptTime = new Date(date);
    let weekday = temptTime.getDay() === 6 ? 7 : temptTime.getDay();

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
    var result = Math.ceil(d / 7) + 1;
    inputField.week = result;
    inputField.date = dateString;
  };

  const handleSubmit = () => {
    if(inputField.date === "") {
      alert("Please select date for new row!");
    }
    else if(isDateExist(getTimeStamp(inputField.date))){
      alert("This date has exist in table. Please change another date!");
    }
    // else if (checkDate(getTimeStamp(inputField.date))) {
    //   alert("This date is not valid, please check it before submission!");
    // }
    else{
      dispatch(addRow(inputField));
      props.setTrigger(false);
    }
  };

  return (
    <div>
      <Form layout="vertical" name="addRow">
        <Form.Item
          label="Date"
          required
          rules={[{ required: true, message: "Please select a valid date!" }]}
        >
          <DatePicker
            onChange={dateHandler}
            style={{
              width: "100%",
              marginRight: "auto",
              marginLeft: "auto",
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            onClick={() => {
              handleSubmit();
            }}
            style={{
              width: "100%",
              marginRight: "auto",
              marginLeft: "auto",
            }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default NewRowForm;
