import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addColumnBefore, addColumnBehind } from "../../redux/slices/tableSlice";
import { Input, Select, Form, Button } from "antd";
import "./Popup.css";
import Operation from "antd/lib/transfer/operation";

function ColumnForm(props) {
  const dispatch = useDispatch();
  const [inputField, setInputField] = useState({
    column_name: "",
    next_col_name: "",
  });

  const[height, setHeight] = useState(0);
  useEffect(()=>{setHeight(document.documentElement.scrollHeight)});

  // get column options
  const col_arr = useSelector((state) => state.columns);
  const col_options = col_arr.map((col) => {
    return {
      value: col.title,
      label: `${col.title}`,
    };
  });

  col_options.push({
    value: "Operation",
    label: "Operation",
  });

  // handle input new columns name
  const inputsHandler = (e) => {
    setInputField((preState)=>{ return{...preState, column_name: e.target.value }});
    setInputField((preState) => {
      return { ...preState, next_col_name: props.curr_col_name};
    });
  };

  // handle select position
  // const selectHandler = (value) => {
  //   setInputField((preState) => {
  //     return { ...preState, next_col_name: value };
  //   });
  //   console.log(inputField.next_col_name);
  // };

  const isColumnNameExist = (col_name) =>
    col_arr.some((col) => {
      return col.title === col_name;
    });

  const onFinish = (values) => {
    // check if user input column name already exists
    if (isColumnNameExist(inputField.column_name)) {
      alert("Column name already exists!");
    } else {
      // check insert before or befind
      if(props.pos === "before")
      {
        dispatch(addColumnBefore(inputField));
        console.log(inputField);
        setInputField({ column_name: "", next_col_name: "" });
        props.resetBefore(false);
        console.log(`[Insert Column Before]: next_col_name: ${inputField.next_col_name}`);
      } 
      else // insert befind
      { 
        dispatch(addColumnBehind(inputField));
        console.log(inputField);
        setInputField({ column_name: "", next_col_name: "" });
        props.resetBehind(false);
        console.log(`[Insert Column Befind]:: pre_col_name: ${inputField.next_col_name}`);
      }
      // close the form after submission
      props.setTrigger(false)
    }
  };


  return props.trigger ? (
    <div className="popup" style={{height:`${height}px`}}>
      <div className="popup-inner">
        <button
          className="popup_close-btn"
          onClick={() => props.setTrigger(false)}
        >
          Close
        </button>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Column Name"
            required
            rules={[
              { required: true, message: "Please input new column name!" },
            ]}
          >
            <Input
              required
              value={inputField.col_name}
              onChange={inputsHandler}
              type="text"
              name="column_name"
              placeholder="Column Name"
              style={{
                width: "100%",
                marginRight: "auto",
                marginLeft: "auto",
              }}
            />
          </Form.Item>

          {/* <Form.Item
            label="Position Before"
            required
            rules={[
              {
                required: true,
                message: "Please select new column insert position!",
              },
            ]}
            tooltip="Insert new column before selected column"
          >
            <Select
              required
              placeholder="Column Name"
              options={col_options}
              onChange={selectHandler}
              style={{
                width: "100%",
                marginRight: "auto",
                marginLeft: "auto",
              }}
            />
          </Form.Item> */}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
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

export default ColumnForm;
