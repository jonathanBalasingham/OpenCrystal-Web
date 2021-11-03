import * as React from "react";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../App.css'

class Dropdown extends React.Component {
    state = {
        isOpen: false
    };

    toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

    render() {
        const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;
        return (
            <div className="dropdown" onClick={this.toggleOpen}>
                <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    style={{'background': '#f8f9fa', 'border': 'none', 'radius': '0', 'color': 'black',
                            'float': 'left'}}
                >
                    Dropdown
                </button>
                <div className={menuClass} aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="#nogo">
                        Item 1
                    </a>
                    <a className="dropdown-item" href="#nogo">
                        Item 2
                    </a>
                    <a className="dropdown-item" href="#nogo">
                        Item 3
                    </a>
                </div>
            </div>
        );
    }
}

export default Dropdown;