import React, { useRef, useState } from "react";
import "../App.css";


const ImportButton = (props) => {
    const fileRef = useRef();
  
    const handleChange = (event) => {
      const [file] = event.target.files;
      console.log(file);
    };
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
            onChange={handleChange}
            multiple={false}
            type="file"
            hidden
          />
        </div>
      </div>
    );
  };

  export default ImportButton;