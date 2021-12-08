import {useState} from "react";
import * as React from "react";



function PlotAppMenuItem({icon, buttons}) {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="plot-app-dropdown">
            <button className="plot-app-menu-button">{ icon }</button>
            <div className="dropdown-content-start">
                {buttons}
            </div>
        </div>
    );
}

export default PlotAppMenuItem;