import * as React from "react";
import {Button, Container, Dropdown} from "react-bootstrap";
import './Dashboard.css'
import CrystalDropdown from './CrystalDropdown'

class LeftPanel extends React.Component {
    render() {
        return (
            <div className='left-panel'>
                <Container fluid>
                    <CrystalDropdown/>
                </Container>
                <Button/>
            </div>
        )
    }
}

export default LeftPanel;