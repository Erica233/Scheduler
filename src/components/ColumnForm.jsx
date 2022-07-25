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

    // const submitButton = () =>{
    //     alert(inputField.column_name)
    // }

    return (
        <div>
            <form>
            <input 
            type="text"
            name="column_name"
            onChange={inputsHandler} 
            placeholder="Column Name" 
            value={inputField.column_name}
            required />
            <br/>
            <button onClick={()=>dispatch(addColumn(inputField))}>Submit</button>
            </form>
        </div>
    )
}

export default ColumnForm;