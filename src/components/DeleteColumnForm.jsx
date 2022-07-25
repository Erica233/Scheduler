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

    const col_options = arr.map((arr) => {
        return {
            value: arr.title,
            label: `${arr.title}`,
        }
    });
    return (
      <div>
        <Select
          className="select"
          size="small"
          placeholder="Please Select"
          options={col_options}
          onChange={handleChange}
        />
        <button onClick={()=>dispatch(deleteColumn(inputField))}>Submit</button>
      </div>
    );
  };

  export default DeleteColumnForm;