import React, {useState} from 'react';
import { useDispatch } from "react-redux";
import { addColumn } from '../redux/slices/tableSlice';


function ColumnForm() {
    const dispatch = useDispatch();
    const [inputField, setInputField] = useState({
        column_name: ''
    })

    const inputsHandler = (e) =>{
        setInputField( {[e.target.name]: e.target.value} )
    }

    function checkform() {
        if(document.columnForm.column_name.value === "") {
            alert("Please Enter Column Name");
            return false;
        } else {
           dispatch(addColumn(inputField));
        }
    }

    return (
        <div>
            <form name="columnForm">
            <input 
            type="text"
            name="column_name"
            onChange={inputsHandler} 
            placeholder="Column Name" 
            value={inputField.column_name}
            />
            <br/>
            <button onClick={()=>checkform()}>Submit</button>
            </form>
        </div>
    )
}

export default ColumnForm;