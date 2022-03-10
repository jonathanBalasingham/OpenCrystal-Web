import './App.scss';
import Dashboard from './components/Dashboard';
import * as React from "react";
import LeftSideBar from "./components/LeftSideBar"
import CreateModal from "./components/CreateModal";
import SettingsModal from "./components/SettingsModal";

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
