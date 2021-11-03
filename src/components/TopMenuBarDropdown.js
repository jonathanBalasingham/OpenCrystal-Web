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
        return (
            <div className="dropdown">
                <button className="dropbtn">File</button>
                <div className="dropdown-content">
                    <button >the</button>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                </div>
            </div>
        );
    }
}

export default Dropdown;