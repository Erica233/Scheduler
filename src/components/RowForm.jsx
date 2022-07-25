import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { addRow } from '../redux/slices/tableSlice';
import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';

function RowForm() {
    const dispatch = useDispatch();

    const [inputField, setInputField] = useState({
        week: "",
        date: "",
    });
    const weekHandler = (event) => {
        setInputField({...inputField, week: event.target.value});
        console.log(event);
    }

    const dateHandler = (event) => {
        setInputField({...inputField, date: event.target.value});
        console.log(event);
    }

    return (
        <div>
            <form>
                <input
                  onChange={weekHandler}
                  value={inputField.week}
                  placeholder="Week"
                  name="week" />
                <br/>
                <input
                  type="date"
                  onChange={dateHandler}
                  value={inputField.date}
                  placeholder="Date"
                  name="date" />
                <br/>
                <button onClick={()=>dispatch(addRow(inputField))}>Submit</button>
            </form>
        </div>
    )
}



export default RowForm;