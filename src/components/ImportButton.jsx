import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import "../App.css";

const ImportButton = (props) => {
  const history = useHistory();
  const fileRef = useRef();

  const handleChange = async (event) => {
    const [file] = event.target.files;

    const formData = new FormData();
    formData.append("file", file);

    // server hostname + url
    const res = await fetch("http://localhost/upload-file", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
    alert(JSON.stringify(`${res.message}, status: ${res.status}`));
    history.push("/edited");
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
