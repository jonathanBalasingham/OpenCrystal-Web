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
                <Dropdown />
            </div>
        )
    }
}

export default TopMenuBar;