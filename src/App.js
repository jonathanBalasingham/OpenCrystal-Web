import './App.scss';
import Dashboard from './components/Dashboard';
import * as React from "react";
import LeftSideBar from "./components/LeftSideBar"
import CreateModal from "./components/create/CreateModal";
import SettingsModal from "./components/SettingsModal";
import {AppHeader} from "./components/AppHeader";

function App() {

    return (
        <div className="App">
            <AppHeader/>
            <LeftSideBar/>
            <CreateModal/>
            <SettingsModal/>
            <Dashboard/>
        </div>
  );
}

export default App;
