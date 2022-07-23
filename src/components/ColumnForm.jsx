import React, {useState} from 'react';
import { useDispatch } from "react-redux";
import { addColumn, deleteColumn } from '../redux/slices/tableSlice';


function ColumnForm() {
    const dispatch = useDispatch();
    const [inputField , setInputField] = useState({
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
            <input 
            type="text" 
            name="column_name"
            onChange={inputsHandler} 
            placeholder="Column Name" 
            value={inputField.column_name}/>

            <br/>

            {/* <input 
            type="text" 
            name="last_name" 
            onChange={inputsHandler} 
            placeholder="First Name" 
            value={inputField.last_name}/>

            <br/>

            <input 
            type="gmail" 
            name="gmail" 
            onChange={inputsHandler} 
            placeholder="Gmail" 
            value={inputField.gmail}/>

            <br/> */}

            <button onClick={()=>dispatch(addColumn())}>Submit</button>
        </div>
    )
}

export default ColumnForm;