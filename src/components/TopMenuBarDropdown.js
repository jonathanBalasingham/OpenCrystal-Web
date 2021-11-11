import * as React from "react";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../App.css'
import {useState} from "react";

function Dropdown({name, buttons}) {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="dropdown">
            <button className="dropbtn">{ name }</button>
            <div className="dropdown-content">
                {buttons}
            </div>
        </div>
    );
}

export default Dropdown;