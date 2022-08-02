// import { render } from '@testing-library/react';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteColumn } from "../../redux/slices/tableSlice";
import { Select, Form, Button } from "antd";
import "./Popup.css";

const { Option } = Select;

function DeleteColumnForm(props) {
  const dispatch = useDispatch();
  const [inputField, setInputField] = useState({});
  const[height, setHeight] = useState(0);

  // set height to extend when scroll
  useEffect(()=>{setHeight(document.documentElement.scrollHeight)});

  const handleChange = (value) => {
    setInputField(value);
  };

  const arr = useSelector((state) => state.columns);
  // console.log(arr);
  const col = arr.filter((column) => {
    return column.title !== "Week" && column.title !== "Date";
  });
  const col_options = col.map((col) => {
    return {
      value: col.title,
      label: `${col.title}`,
    };
  });

  return props.trigger ? (
    <div className="popup" style={{height:`${height}px`}}>
      <div className="popup-inner">
        <button
          className="popup_close-btn"
          onClick={() => props.setTrigger(false)}
        >
          Close
        </button>
        <Form layout="vertical">
          <Form.Item
            label="Column Name"
            required
            rules={[
              { required: true, message: "Please input new column name!" },
            ]}
          >
            <Select
              placeholder="Column Name"
              onChange={handleChange}
              options={col_options}
              style={{
                width: "100%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              onClick={() => {
              dispatch(deleteColumn(inputField));
              props.setTrigger(false);
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
    </div>
  ) : (
    ""
  );
}

export default DeleteColumnForm;
