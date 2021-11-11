import * as React from "react";
import '../App.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Dropdown from "./TopMenuBarDropdown";
import { createPopper } from '@popperjs/core/lib/popper-lite.js';
import 'bootstrap/dist/css/bootstrap.min.css';



function TopMenuBar({})  {

    let fileButtons =
        <>
            <button >New</button>
            <button >Open</button>
            <button >Open Recent</button>
        </>

    let helpButtons =
        <>
            <button>About</button>
        </>
    return (
        <div id="TopMenuBar">
            <Dropdown name={"File"} buttons={fileButtons}/>
            <Dropdown name={"Edit"} buttons={fileButtons}/>
            <Dropdown name={"Help"} buttons={helpButtons}/>
        </div>
    )
}

export default TopMenuBar;