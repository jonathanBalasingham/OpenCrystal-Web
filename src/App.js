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
import Ball from "./Logo";
import {Canvas} from "@react-three/fiber";
import CreateModal from "./components/CreateModal";
import SettingsModal from "./components/SettingsModal";
import {useSelector} from "react-redux";
import {getViewOpened} from "./features/view/viewSlice";

function App() {

    return (
        <div className="App">
            <LeftSideBar/>
            <CreateModal/>
            <SettingsModal/>
            <Dashboard/>
        </div>
  );
}

export default App;
