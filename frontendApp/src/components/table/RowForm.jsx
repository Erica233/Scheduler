import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRow } from "../../redux/slices/tableSlice";
import { Form, Button, DatePicker } from "antd";
import "antd/dist/antd.css";
import "./Popup.css";

function RowForm() {
  const dispatch = useDispatch();
  const table_year = useSelector((state) => state.selected_year);
  let inputField = {week: '', date: ''};

  const dateHandler = (date, dateString) => {
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
    dispatch(addRow(inputField));
  };

  return (
    <div>
      <Form layout="vertical" name="addRow">
        <Form.Item
          label="Date"
          required
          rules={[{ required: true, message: "Please input new column name!" }]}
        >
          <DatePicker onChange={dateHandler} 
          style={{
              width: "100%",
              marginRight: "auto",
              marginLeft: "auto",
            }}/>
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

export default RowForm;
