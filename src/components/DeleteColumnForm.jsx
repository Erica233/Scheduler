// import { render } from '@testing-library/react';
import React, {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteColumn } from '../redux/slices/tableSlice';
import Select from "react-select";


function DeleteColumnForm() {
    const dispatch = useDispatch();
    const [inputField, setInputField] = useState({
    })

    const handleChange = option => {
      setInputField(option.value);
    };

    const arr = useSelector((state) => state.columns);
    console.log(arr);
    const col = arr.filter(column => {
        return column.title !== "Week" && column.title !== "Date";
    })
    const col_options = col.map((col) => {
        return {
            value: col.title,
            label: `${col.title}`,
        }
    });
    return (
      <div>
        <Select
          className="select"
          size="small"
          placeholder="Please Select Column To Delete"
          options={col_options}
          onChange={handleChange}
        />
        <button onClick={()=>dispatch(deleteColumn(inputField))}>Submit</button>
      </div>
    );
  };

  export default DeleteColumnForm;