import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { addRow } from '../redux/slices/tableSlice';
import 'antd/dist/antd.css';

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


    var inputDate = new Date(inputField.date);
    var oneJan = new Date(inputDate.getFullYear(), 0, 1);
    var numberOfDays = Math.floor((inputDate - oneJan) / (24 * 60 * 60 * 1000));
    var result = Math.ceil(( inputDate.getDay() + 1 + numberOfDays) / 7);
    inputField.week = result;
    console.log(`Week Number (${inputDate}) is ${inputField.week}.`);

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
                  type="date" required
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