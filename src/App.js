import './App.css';
import Dashboard from './components/Dashboard';
import Navbar from 'react-bootstrap/Navbar'
import {Container, Button, NavDropdown, Form, FormControl, Nav, Offcanvas} from "react-bootstrap";
import * as React from "react";
import TopMenuBar from "./components/TopMenuBar";
import LeftSideBar from "./components/LeftSideBar"
import OptionsPanel from "./components/OptionsPanel";
import LeftTaskBar from "./components/LeftTaskBar";
import Footer from "./containers/Footer";

function App() {
  return (
    <div className="App">
        <Navbar id={"main-header"} bg="var(--defaultsecondary)" expand={false} style={{borderBottom: '2px solid var(--defaultborder)', gridArea: 'header'}}>
            <Container fluid>
                <Navbar.Brand href="#">OpenCrystal</Navbar.Brand>
                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">Offcanvas</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link href="#action1">Home</Nav.Link>
                            <Nav.Link href="#action2">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
                                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action5">
                                    Something else here
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
        <TopMenuBar/>
        <Dashboard/>
        <Footer />
    </div>
  );
}

export default App;
