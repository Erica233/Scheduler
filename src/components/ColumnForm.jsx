import React, {useState} from 'react';
import { useDispatch } from "react-redux";
import { addColumn } from '../redux/slices/tableSlice';
import './Popup.css';

function ColumnForm(props) {
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
           setInputField("");
        }
    }

    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={()=>props.setTrigger(false)}>Close</button>
                <form name="columnForm">
            <input 
            type="text"
            name="column_name"
            onChange={inputsHandler} 
            placeholder="Column Name" 
            value={inputField.column_name}
            />
            <br/>
            <button onClick={()=>{checkform(); props.setTrigger(false);}}>Submit</button>
            </form>
            </div>
        </div>
      ) : "";

    // return (
    //     <div>
    //         <form name="columnForm">
    //         <input 
    //         type="text"
    //         name="column_name"
    //         onChange={inputsHandler} 
    //         placeholder="Column Name" 
    //         value={inputField.column_name}
    //         />
    //         <br/>
    //         <button onClick={()=>checkform()}>Submit</button>
    //         </form>
    //     </div>
    // )
}

export default ColumnForm;