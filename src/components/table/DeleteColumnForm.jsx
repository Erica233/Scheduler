// import { render } from '@testing-library/react';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteColumn } from "../../redux/slices/tableSlice";
import { Select } from "antd";
import "./Popup.css";

const { Option } = Select;

function DeleteColumnForm(props) {
  const dispatch = useDispatch();
  const [inputField, setInputField] = useState({});

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
    <div className="popup">
      <div className="popup-inner">
        <button
          className="popup_close-btn"
          onClick={() => props.setTrigger(false)}
        >
          Close
        </button>
        <Select
          placeholder="Column Name"
          onChange={handleChange}
          options={col_options}
          style={{
            width: 200,
            marginRight: "30px",
          }}
        />
        <button
          className="popup__btn"
          onClick={() => {
            dispatch(deleteColumn(inputField));
            props.setTrigger(false);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  ) : (
    ""
  );

  // return (
  //   <div>
  //     <Select
  //       className="select"
  //       size="small"
  //       placeholder="Please Select Column To Delete"
  //       options={col_options}
  //       onChange={handleChange}
  //     />
  //     <button onClick={()=>dispatch(deleteColumn(inputField))}>Submit</button>
  //   </div>
  // );
}

export default DeleteColumnForm;
