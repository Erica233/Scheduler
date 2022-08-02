import React, { useState, useEffect } from "react";
import './Popup.css';


function Popup(props) {
  const[height, setHeight] = useState(0);
  useEffect(()=>{setHeight(document.documentElement.scrollHeight)});
  
  return (props.trigger) ? (
    <div className="popup" style={{height:`${height}px`}}>
        <div className="popup-inner">
            <button className="popup_close-btn" onClick={()=>props.setTrigger(false)}>Close</button>
            { props.children }
        </div>
    </div>
  ) : "";
}

export default Popup;
