import React, { useRef, useDispatch } from "react";
import { useHistory } from "react-router-dom";
import "../App.css";
import { setTableName, setData } from "../redux/slices/tableSlice";


const ImportButton = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const fileRef = useRef();
  const [table_name, setTableName] = React.useState("");


  return (
    <div id="button" className="row">
      <div className="buttonContainer">
        <button
          className="importButton"
          onClick={() => fileRef.current.click()}
        >
          {props.title}
        </button>
        <input
          ref={fileRef}
          onChange={handleImport}
          multiple={false}
          type="file"
          accept=".csv"
          hidden
        />
      </div>
    </div>
  );
};

export default ImportButton;
