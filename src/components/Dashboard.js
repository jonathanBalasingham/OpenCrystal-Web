import './Dashboard.css'
import LeftPanel from "./LeftPanel";
import {BrowserRouter, Route} from "react-router-dom";
import * as React from "react";
import SideNav, {NavIcon, NavItem, NavText} from "@trendmicro/react-sidenav";

import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import LeftTaskBar from "./LeftTaskBar";
import ApplicationBay from "./ApplicationBay";
import LeftSideBar from "./LeftSideBar";
import OptionsPanel from "./OptionsPanel";
import SearchPanel from "./SearchPanel";

function Dashboard() {
    let panels = <div>
        <OptionsPanel id="Compare-panel" width={"300px"} />
        <OptionsPanel id="View-panel" width={"300px"} />
        <OptionsPanel id="Database-panel" width={"300px"}/>
        <OptionsPanel id="Settings-panel" width={"300px"}/>
    </div>
    return (
        <div className="dashboard">
            <SearchPanel/>
            <ApplicationBay/>
        </div>
    )
}

export default Dashboard;