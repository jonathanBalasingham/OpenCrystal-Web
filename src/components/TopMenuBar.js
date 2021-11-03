import * as React from "react";
import '../App.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Dropdown from "./TopMenuBarDropdown";
import { createPopper } from '@popperjs/core/lib/popper-lite.js';
import 'bootstrap/dist/css/bootstrap.min.css';


class TopMenuBar extends React.Component {
    render() {
        return (
            <div id="TopMenuBar">
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                        <button className="dropdown-item" type="button">Action</button>
                        <button className="dropdown-item" type="button">Another action</button>
                        <button className="dropdown-item" type="button">Something else here</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default TopMenuBar;